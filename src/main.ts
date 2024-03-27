import * as dotenv from 'dotenv';
dotenv.config({ path: `.env` });
// dotenv.config({ path: `.env` });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Permission } from './entities/permission.entity';
import { EntityManager, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import helmet from 'helmet';
import {
  EXCLUDED_ROUTES,
  getPermissionNameFromRoute,
} from './utils/helper.utils';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';
import {
  accessLogMiddleware,
  errorLogMiddleware,
} from './middleware/logging.middleware';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { User } from './entities/user.entity';
import { AES } from 'crypto-js';
import { createLanguageData, createCurrencyData } from './utils/master.util';

let permissionRepo: Repository<Permission>;
let roleRepo: Repository<Role>;
let userRepo: Repository<User>;
async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    httpsOptions: null,
  });
  app.use(accessLogMiddleware());

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  app.useWebSocketAdapter(new IoAdapter(app));
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.use(new ThrottlingExceptionFilter());
  const whitelist = [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:8080',
    'http://localhost:8090',
  ];
  const corsOptions = {
    origin: function (origin: any, callback: any) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    methods: ['*'],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  app.enableCors(corsOptions);

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('ASA Automation Tools for complete Logistics Solution.')
    .setDescription('ASA Automation Tools for complete Logistics Solution.')
    .setVersion('1.0')
    .addServer(process.env.SWAGGER_SERVER)
    .addServer(process.env.SWAGGER_DEV_SERVER)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  server.use(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(document, {
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: false,
      },
    }),
  );

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );
  app.use(errorLogMiddleware);
  await app.listen(process.env.PORT || 4800);

  const entityManager: EntityManager = app.get(EntityManager);
  permissionRepo = entityManager.getRepository(Permission);
  roleRepo = entityManager.getRepository(Role);
  userRepo = entityManager.getRepository(User);

  extractAndSaveRoutes(server);
  createMasterData();
}

bootstrap();

function extractAndSaveRoutes(server: express.Express) {
  // // console.log('server._router.stack   :   ', server._router.stack);
  const routes = server._router.stack
    .filter((layer: { route: any }) => layer.route)
    .map((layer: { route: { methods: object; path: any; stack: any } }) => ({
      methods: Object.keys(layer.route.methods).map((method) =>
        method.toUpperCase(),
      ),
      path: layer.route.path,
      stack: layer.route?.stack || '',
    }));

  for (const route of routes) {
    saveRouteAsPermission(route);
  }
  associatePermissionWithAdminRole();
}

async function saveRouteAsPermission(route: any) {
  const name = getPermissionNameFromRoute(route.path, route.methods[0])
    .toUpperCase()
    .replaceAll('-', '_');

  // Avoid multiple database queries by checking for the existence of the permission just once
  let permission = await permissionRepo.findOne({
    where: { name, path: route.path },
  });

  if (!permission && !EXCLUDED_ROUTES.includes(name.toUpperCase())) {
    permission = await savePermission(name, route.path);
  }
}

function savePermission(name: string, path: any): Promise<Permission> {
  const permission = permissionRepo.create({
    name,
    path,
  });

  return permissionRepo.save(permission);
}

async function associatePermissionWithAdminRole() {
  const permissions: Permission[] = await permissionRepo.find();
  let role = await roleRepo.findOne({
    where: { name: 'admin' },
    relations: ['permissions'],
  });

  if (!role) {
    // If the admin role doesn't exist, create it and assign all permissions
    role = new Role();
    role.name = 'admin';
    role.description = 'Administrator';
    role.is_public = false;
    role.permissions = permissions;
    await roleRepo.save(role);
  } else {
    // If the admin role exists, make sure all permissions are assigned
    for (const permission of permissions) {
      if (!role.permissions.some((p) => p.id === permission.id)) {
        role.permissions.push(permission);
      }
    }
    await roleRepo.save(role);
  }

  let username = process.env.ADMIN_USERNAME || 'admin';
  let pwd = process.env.ADMIN_PASSWORD || 'Admin@123';
  let adminUser = await userRepo.findOne({
    where: { roles: { id: role.id }, username },
  });
  if (!adminUser) {
    adminUser = new User();
    adminUser.name = 'Administrator';
    adminUser.username = username;
    adminUser.roles = role;
    const hashPassord = AES.encrypt(pwd, process.env.ENCRYPTION_KEY).toString();
    adminUser.password = hashPassord;
    await userRepo.save(adminUser);
  }

  role = await roleRepo.findOne({
    where: { name: process.env.VENDOR_ROLE_NAME },
  });

  if (!role) {
    role = new Role();
    role.name = process.env.VENDOR_ROLE_NAME;
    role.description = 'Vendor';
    role.permissions = [];
    role.is_public = false;
    await roleRepo.save(role);
  }

  role = await roleRepo.findOne({
    where: { name: process.env.MEMBER_ROLE_NAME },
  });

  if (!role) {
    role = new Role();
    role.name = process.env.MEMBER_ROLE_NAME;
    role.description = 'Guest';
    role.permissions = [];
    role.is_public = false;
    await roleRepo.save(role);
  }

  username = process.env.GUEST_USERNAME || process.env.MEMBER_ROLE_NAME;
  pwd = process.env.GUEST_PASSWORD || 'Guest@123';
  let guestUser = await userRepo.findOne({
    where: { roles: { id: role.id }, username },
  });
  if (!guestUser) {
    guestUser = new User();
    guestUser.name = 'Guest';
    guestUser.username = username;
    guestUser.roles = role;
    const hashPassord = AES.encrypt(pwd, process.env.ENCRYPTION_KEY).toString();
    guestUser.password = hashPassord;
    await userRepo.save(guestUser);
  }
}
function createMasterData() {
  createLanguageData();
  createCurrencyData();
}
