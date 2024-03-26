// block-ip.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Request, Response, NextFunction } from 'express';
import { BlackListIp } from 'src/entities/black-list.entity';

@Injectable()
export class BlockIpMiddleware implements NestMiddleware {
  private blockedIps: Set<string> = new Set();

  use(req: Request, res: Response, next: NextFunction) {
    const throttlerException: ThrottlerException | undefined =
      req['throttlerException'];
    if (throttlerException) {
      this.blockIp(req.socket.remoteAddress);
    }
    next();
  }

  private async blockIp(ip: string) {
    this.blockedIps.add(ip);
    // console.log(`Blocking IP: ${ip}`);
    let blackList = await BlackListIp.findOne({ where: { ip: ip } });
    if (!blackList) {
      blackList = new BlackListIp();
      blackList.ip = ip;
      await blackList.save();
    }
    setTimeout(
      () => {
        this.unblockIp(ip);
      },
      10 * 24 * 60 * 60 * 1000,
    );
  }

  private async unblockIp(ip: string) {
    const blackList = await BlackListIp.findOne({ where: { ip: ip } });
    if (blackList) {
      await BlackListIp.delete(blackList.id);
    }
    this.blockedIps.delete(ip);
    // console.log(`Unblocking IP: ${ip}`);
  }
}
