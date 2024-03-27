import { AdminPageController } from 'src/controllers/admin-page.controller';
import { AuthController } from 'src/controllers/auth.controller';
import { BroadcastingController } from 'src/controllers/broadcasting.controller';
import { CurrencyController } from 'src/controllers/currency.controller';
import { FilesController } from 'src/controllers/files.controller';
import { LanguageController } from 'src/controllers/language.controller';
import { LogController } from 'src/controllers/log.controller';
import { PermissionsController } from 'src/controllers/permission.controller';
import { RoleController } from 'src/controllers/role.controller';
import { UserController } from 'src/controllers/user.controller';

export const ImportControllers = [
  AuthController,
  UserController,
  RoleController,
  PermissionsController,
  LogController,
  BroadcastingController,
  CurrencyController,
  LanguageController,
  FilesController,
  AdminPageController,
];
