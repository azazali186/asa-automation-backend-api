import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import logger from 'src/utils/logger';
import { ApiResponse } from 'src/utils/response.util';
import { LangService } from 'src/services/lang.service';
import { Telegram } from 'telegraf';
import { bold, join, underline } from 'telegraf/format';

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: LangService) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const req = ctx.getRequest<any>();
    const status = exception.getStatus();
    logger.error(exception.getResponse());

    if (process.env.TG_LOG === 'true') {
      try {
        const telegram = new Telegram(process.env.TG_BOT_TOKEN as string);
        const message = join([
          bold(underline(exception.name)),
          bold(`\nclient ip is ${req.socket.remoteAddress}`),
          bold(`\napi is ${req.baseUrl + req.path}`),
        ]);
        telegram
          .sendMessage(process.env.TG_ERROR_LOG_CHAT_ID, message)
          .then(() => console.log('message send'));
      } catch (e) {
        // console.log('ee::::>>>>', e);
      }
    }

    let errorResponse: any; // Define a variable to store the error response

    if (typeof exception.getResponse() === 'object') {
      errorResponse = exception.getResponse();
    } else {
      errorResponse = { error: exception.getResponse() as string };
    }

    const data = new Set(errorResponse.message.toString().split(','));
    const translatedMessage = [];
    data.forEach((d) => {
      const msg = this.i18n.getErrorTranslation(`${d}`, errorResponse.param);
      if (msg.includes('error.')) {
        translatedMessage.push(d);
      } else {
        translatedMessage.push(msg);
      }
      // console.log('msg ', msg);
    });
    const res = await ApiResponse.error(status, translatedMessage);
    response.status(status).json(res);
  }
}
