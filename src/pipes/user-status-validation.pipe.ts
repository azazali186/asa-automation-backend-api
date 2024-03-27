import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CommonStatus } from 'src/enum/common-status.enum';

export class UserStatusValidationPipes implements PipeTransform {
  readonly userStatus = [CommonStatus.ACTIVE, CommonStatus.INACTIVE];
  transform(value: any) {
    let val = value.status;
    if (val) {
      val = val.toUpperCase();
      if (!this.isValidStatus(val)) {
        throw new BadRequestException({
          statusCode: 400,
          message: `invalid product status ${val}`,
        });
      }
      value.status = val;
    }

    return value;
  }
  private isValidStatus(status: any) {
    const idx = this.userStatus.indexOf(status);
    return idx !== -1;
  }
}
