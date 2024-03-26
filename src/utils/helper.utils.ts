import { Between, Repository } from 'typeorm';
import { format } from 'date-fns';
import { BadRequestException } from '@nestjs/common';
import { MediaTypeEnum } from 'src/enum/media-type.enum';
import { User } from 'src/entities/user.entity';
import { Telegram } from 'telegraf';

export function getPermissionNameFromRoute(
  path: string,
  method: string,
): string {
  method = getMethodName(path, method);
  const name = path;
  path =
    method.toLowerCase() +
    '-' +
    path.replaceAll('/api/v1/', '').replaceAll('/', '-').replace('-:id', '');

  if (path.includes('login')) {
    path = 'login';
  }
  if (path.includes('logout')) {
    path = 'logout';
  }
  if (path.includes('register')) {
    path = 'register';
  }
  if (path.includes('forgot-password')) {
    path = 'forgot-password';
  }
  if (path.includes('reset-password')) {
    path = 'reset-password';
  }
  if (path.includes('verify-email')) {
    path = 'verify-email';
  }
  if (path.includes('swagger')) {
    path = 'swagger';
  }
  if (path.includes('public')) {
    path = 'public';
  }
  if (
    path.includes('approval') ||
    path.includes('reject') ||
    path.includes('approve') ||
    path.includes('approved') ||
    path.includes('cancel') ||
    path.includes('cancelled') ||
    path.includes('rejected') ||
    path.includes('confirmed') ||
    path.includes('confirm')
  ) {
    path = name
      .replaceAll('/api/v1/', '')
      .replaceAll('/', '-')
      .replace('-:id', '');
  }
  return path;
}

export const routeMappings = {
  '/api/v1/products/sku': '/api/v1/products/sku/:sku',
  '/api/v1/products/slug': '/api/v1/products/slug/:slug',
  '/api/v1/products/details': '/api/v1/products/details/:slug',
  '/api/v1/search/product': '/api/v1/search/product/:product',
  '/api/v1/search/category': '/api/v1/search/category/:category',
  '/api/v1/search/shop': '/api/v1/search/shop/:shop',
  '/api/v1/vendor/shop/details': '/api/v1/vendor/shop/details/:slug',
};

export const EXCLUDED_ROUTES = [
  'LOGIN',
  'SWAGGER',
  'REGISTER',
  'LOGOUT',
  'FORGOT_PASSWORD',
  'VERIFY_EMAIL',
  'RESET_PASSWORD',
  'PUBLIC',
  'VIEW_ALL_CURRENCIES',
  'VIEW_ALL_LANGUAGES',
  'VIEW_ALL_PRODUCTS_SKU_:SKU',
  'VIEW_ALL_PRODUCTS_SLUG_:SLUG',
  'VIEW_ALL_SEARCH',
  'VIEW_ALL_SEARCH_PRODUCT_:PRODUCT',
  'VIEW_ALL_SEARCH_CATEGORY_:CATEGORY',
  'VIEW_ALL_SEARCH_SHOP_:SHOP',
  'VIEW_ALL_PRODUCTS_DETAILS_:SLUG',
  'VIEW_ALL_VENDOR_SHOP_DETAILS_:SLUG',
];

export const CHECK_LOGIN_ROUTES = [
  'LOGOUT',
  'BROADCAST',
  'VIEW_ALL_COMMON_GET_FILTERS',
  'VIEW_ALL_PERMISSIONS',
  'VIEW_ALL_AUTH_INFO',
  'VIEW_ALL_AUTH_USER',
];

export function getMethodName(path: string, method: string): string {
  switch (method) {
    case 'GET':
      if (path.slice(-3) == ':id') {
        method = 'view';
      } else {
        method = 'view-all';
      }
      break;
    case 'POST':
      method = 'create';
      break;
    case 'PATCH':
      method = 'update';
      break;
    case 'PUT':
      method = 'update';
      break;
    case 'DELETE':
      method = 'delete';
      break;

    default:
      method = 'view-all';
      break;
  }
  return method;
}

export const BetweenDates = (from: Date | string, to: Date | string) =>
  Between(
    format(
      typeof from === 'string' ? new Date(from) : from,
      'yyyy-MM-dd HH:mm:ss',
    ),
    format(typeof to === 'string' ? new Date(to) : to, 'yyyy-MM-dd HH:mm:ss'),
  );

export const GetJsonFromString = (body: any) => {
  const req: any = {};

  try {
    if (body) {
      body = body.replace(/\{|\}/g, '').replace(/\\n/g, '').split(',');

      body.forEach((b) => {
        const bdata = b.split(':');
        req[bdata[0].trim()] = bdata[1].trim();
      });
    }
  } catch (error) {
    throw new Error('INVALID_WS_REQUEST_BODY');
  }
  return req;
};

export function splitDateRange(dateRangeString: string) {
  const dateRangeFormat =
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  if (!dateRangeString.match(dateRangeFormat)) {
    throw new BadRequestException(
      `Invalid date range format. The expected format is YYYY-MM-DD HH:mm:ss,YYYY-MM-DD HH:mm:ss`,
    );
  }

  const [start, end] = dateRangeString.split(',');
  const startDate = new Date(start.trim());
  const endDate = new Date(end.trim());
  return { startDate, endDate };
}

export function getMultipleSums(jsonArray: any[], keys: any[]) {
  const sums = {};

  keys.forEach((key) => {
    sums[key] = 0;
  });

  jsonArray.forEach((item) => {
    keys.forEach((key) => {
      if (item.hasOwnProperty(key) && typeof item[key] === 'number') {
        sums[key] += item[key];
      }
    });
  });

  return sums;
}

export function getMediaTypeFromMimetype(
  mimetype: string,
): MediaTypeEnum | null {
  const mediaTypeMap: { [key: string]: MediaTypeEnum } = {
    image: MediaTypeEnum.IMAGES,
    video: MediaTypeEnum.VIDEO,
    audio: MediaTypeEnum.AUDIO,
    document: MediaTypeEnum.MSWORD,
    sheet: MediaTypeEnum.EXCEL,
    pdf: MediaTypeEnum.PDF,
  };
  let fileType = mimetype.split('/')[0];

  if (fileType === 'application') {
    fileType = mimetype.split('/')[1];
  }

  fileType = fileType?.split('.')?.pop();

  const lowercaseMimetype = fileType.toLowerCase();

  const mt = mediaTypeMap[lowercaseMimetype];
  return mt;
}

export const getEntityById = async (repo: Repository<any>, id: number) => {
  return await repo.findOneOrFail({ where: { id: id } });
};

export const getEntityByCode = async (repo: Repository<any>, code: string) => {
  return await repo.findOneOrFail({ where: { code: code } });
};

export const getCustomUserResponse = (user: User): Record<string, any> => {
  return {
    id: user.id,
    username: user.username,
    roles_id: user.roles_id,
    status: user.status,
  };
};

export const sendTelegramMessage = (message: string, chatId: string) => {
  try {
    const telegram = new Telegram(process.env.TG_BOT_TOKEN as string);
    telegram.sendMessage(chatId, message);
  } catch (e) {
    // console.log('ee::::>>>>' + e);
  }
};
