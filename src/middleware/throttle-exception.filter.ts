import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Telegram } from 'telegraf';
import { bold, join, underline } from 'telegraf/format';

@Catch(ThrottlerException)
export class ThrottlingExceptionFilter implements ExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const req = ctx.getRequest<any>();
    this.handleThrottlingError(exception, response, req);
  }

  private handleThrottlingError(
    exception: ThrottlerException,
    response: any,
    req: any,
  ) {
    console.error('Throttling error:', exception.message);
    const telegram = new Telegram(process.env.TG_BOT_TOKEN as string);
    const message = join([
      bold(underline(exception.name)),
      bold(`\nclient ip is ${req.socket.remoteAddress}`),
      bold(`\ntry to hack ${req.baseUrl + req.path}`),
    ]);
    telegram
      .sendMessage(process.env.TG_HACK_PROTECTION_LOG_CHAT_ID, message)
      .then(() => console.log('message send'));
    this.retryAfterDelay(response);
  }

  private retryAfterDelay(response: any) {
    setTimeout(() => {
      response.status(HttpStatus.TOO_MANY_REQUESTS).json({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: 'Too Many Requests. Please try again later.',
      });
    }, 1000);
  }
}
