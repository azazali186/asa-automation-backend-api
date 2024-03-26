import { Injectable } from '@nestjs/common';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class LangService {
  constructor(private i18nService: I18nService) {}

  getTranslation(message: any, param: any = null) {
    let language = (I18nContext?.current()?.lang || 'zh') as string;
    // console.log('language is ', language);
    if (language.includes('-')) {
      language = language.split('-')[0];
    }
    return this.i18nService.t(`messages.${message}`, {
      lang: language,
      args: {
        data: param,
      },
    });
  }
  getErrorTranslation(message: any, param: any = null) {
    const language = (I18nContext?.current()?.lang || 'zh') as string;
    return this.i18nService.t(`error.${message}`, {
      lang: language,
      args: {
        data: param,
      },
    });
  }
}
