/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response, NextFunction } from 'express';
import { Log } from 'src/entities/log.entity';
import { AdminPageRepository } from 'src/repositories/admin-page.repository';
import { LogRepository } from 'src/repositories/log.repository';
import { getClientIpUtil } from 'src/utils/get-client-ip.util';
import {
  EXCLUDED_ROUTES,
  getPermissionNameFromRoute,
  routeMappings,
  sendTelegramMessage,
} from 'src/utils/helper.utils';
import * as morgan from 'morgan';
// import { ElasticService } from 'src/services/elastic.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Log)
    private logRepository: LogRepository,
    @InjectRepository(AdminPageRepository)
    private apRepo: AdminPageRepository,
  ) {}

  private readonly indexName =
    process.env.LOGS_INDEX_ELK || 'nest-ecom-elk-logs';

  private logger = morgan((tokens, req: any, res: any) => {
    if (tokens.method(req, res) !== 'OPTIONS') {
      const action = req.action;
      const adminPages = req.adminPages;
      const reqBody = JSON.stringify(req.body) === '{}' ? req.query : req.body;
      const log = new Log(); // Create a new Log entity
      log.method = tokens.method(req, res);
      log.url = req.baseUrl + req.path;
      log.hostname = req.hostname;
      log.request_body = JSON.stringify(reqBody);
      log.status_code = tokens.status(req, res);
      log.response_time = tokens['response-time'](req, res) + ' ms';
      log.content_length = tokens.res(req, res, 'content-length');
      log.browser = req.useragent.browser;
      log.version = req.useragent.version;
      log.os = req.useragent.os;
      log.ip_address = getClientIpUtil(req);
      log.platform = req.useragent.platform;
      log.user_agent = req.useragent.source;
      log.action = action;
      log.admin_page = adminPages;
      log.requested_by = req?.user?.username || 'guest';
      log.mobile_number = req?.user?.mobile_number || 'guest';
      this.logRepository.save(log);
      // try {
      //   const elk = this.elService.createIndex(this.indexName, log);
      // } catch (error) {
      //   // console.log('error while creating log elk');
      // }
      const message = `API NAME: ${action}\nAPI REQUEST PARAMS: ${JSON.stringify(
        reqBody,
        null,
        2,
      )}\nREQUEST TIME: ${new Date()}`;
      /* sendTelegramMessage(
        message,
        process.env.TG_API_CALL_LOG_GROUP || '-4057247984',
      ); */
      return JSON.stringify(log);
    }
    return ''; // Return an empty string if the request is an OPTIONS request
  });

  use(req: any, res: Response, next: NextFunction) {
    this.logger(req, res, async (err) => {
      let routeWithoutId = req.baseUrl.replace(/\/[a-f0-9-]+$/, '/:id');

      Object.entries(routeMappings).forEach(([pattern, replacement]) => {
        if (routeWithoutId.includes(pattern)) {
          routeWithoutId = replacement;
        }
      });
      // // console.log('req', req);
      const action = getPermissionNameFromRoute(routeWithoutId, req.method);

      if (!EXCLUDED_ROUTES.includes(action)) {
        const adminPages = await this.apRepo
          .createQueryBuilder('admin_page')
          .leftJoinAndSelect('admin_page.children', 'children')
          .leftJoinAndSelect('children.permissions', 'permissions')
          .select(['admin_page.id', 'admin_page.name'])
          .where('admin_page.parent IS NULL')
          .where('permissions.name = :action', { action })
          .getOne();

        req.adminPages = adminPages?.name || action;

        req.action = action;
      } else {
        req.adminPages = action;
        req.action = action;
      }
      if (err) {
        console.error('error', err);
      }
      next();
    });
  }
}
