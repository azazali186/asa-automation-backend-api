import { APP_FILTER } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { QueryFailedErrorFilter } from 'src/middleware/all-exception.filter';
import { HttpExceptionFilter } from 'src/middleware/http-exception.filter';
import { JwtWebSocketMiddleware } from 'src/middleware/jwt-socket.middlwware';
import { AdminPageRepository } from 'src/repositories/admin-page.repository';
import { CatalogRepository } from 'src/repositories/catalog.repository';
import { CategoryRepository } from 'src/repositories/category.repository';
import { CurrencyRepository } from 'src/repositories/currency.repository';
import { FilesRepository } from 'src/repositories/files.repository';
import { ImagesRepository } from 'src/repositories/image.repository';
import { LanguageRepository } from 'src/repositories/language.repository';
import { LogRepository } from 'src/repositories/log.repository';
import { MemberRepository } from 'src/repositories/member.repository';
import { PermissionRepository } from 'src/repositories/permission.repository';
import { PriceRepository } from 'src/repositories/price.repository';
import { ProductFeatureRepository } from 'src/repositories/product-features.repository';
import { ProductInterationRepository } from 'src/repositories/product-interaction.repository';
import { ProductRepository } from 'src/repositories/product.repository';
import { RoleRepository } from 'src/repositories/role.repository';
import { SessionRepository } from 'src/repositories/session.repository';
import { ShopRepository } from 'src/repositories/shop.repository';
import { StockRepository } from 'src/repositories/stock.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { TranslationsRepository } from 'src/repositories/translation.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { VariationRepository } from 'src/repositories/varaition.repository';
import { VendorRepository } from 'src/repositories/vendor.repository';
import { AdminPageService } from 'src/services/admin-page.service';
import { AuthService } from 'src/services/auth.service';
import { CatalogService } from 'src/services/catalog.service';
import { CategoryService } from 'src/services/category.service';
import { CurrencyService } from 'src/services/currency.service';
import { ElasticService } from 'src/services/elastic.service';
import { FilesService } from 'src/services/files.service';
import { JwtAuthService } from 'src/services/jwt-auth.service';
import { LangService } from 'src/services/lang.service';
import { LanguageService } from 'src/services/language.service';
import { LogService } from 'src/services/log.service';
import { MemberService } from 'src/services/member.service';
import { PermissionService } from 'src/services/permission.service';
import { ProductService } from 'src/services/product.service';
import { RecomService } from 'src/services/recom.service';
import { RedisService } from 'src/services/redis.service';
import { RoleService } from 'src/services/role.service';
import { SearchService } from 'src/services/search.service';
import { TagService } from 'src/services/tag.setvice';
import { UserService } from 'src/services/user.service';
import { VendorService } from 'src/services/vendor.service';
import { WsCustomService } from 'src/services/ws.service';
import { WsGateway } from 'src/ws/ws.gateway';

export const ImportProviders = [
  {
    provide: APP_FILTER, // Use APP_FILTER token to register global filters
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: QueryFailedErrorFilter,
  },
  LangService,
  JwtService,
  UserService,
  UserRepository,
  RoleRepository,
  SessionRepository,
  PermissionRepository,
  JwtWebSocketMiddleware,
  JwtAuthService,
  WsGateway,
  UserRepository,
  RoleRepository,
  PermissionRepository,
  AdminPageRepository,
  SessionRepository,
  UserService,
  AuthService,
  RoleService,
  PermissionService,
  WsCustomService,
  JwtService,
  LogService,
  LogRepository,
  RedisService,
  CurrencyRepository,
  CurrencyService,
  CategoryRepository,
  CategoryService,
  LanguageRepository,
  LanguageService,
  TranslationsRepository,
  ImagesRepository,
  ProductRepository,
  ProductService,
  StockRepository,
  PriceRepository,
  ElasticService,
  ProductInterationRepository,
  RecomService,
  FilesService,
  FilesRepository,
  CatalogService,
  CatalogRepository,
  VariationRepository,
  AdminPageService,
  ProductFeatureRepository,
  TagService,
  TagRepository,
  MemberService,
  MemberRepository,
  VendorService,
  VendorRepository,
  ShopRepository,
  SearchService,
];
