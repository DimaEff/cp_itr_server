import {forwardRef, Module} from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {GoogleStrategy} from "./strategies/google.strategy";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {HelperModule} from "../helper/helper.module";
import {FacebookStrategy} from "./strategies/facebook.strategy";
import {VkontakteStrategy} from "./strategies/vk.strategy";


@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, FacebookStrategy, VkontakteStrategy, JwtStrategy],
  imports: [
      forwardRef(() => UsersModule),
      ConfigModule,
      JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
              secret: configService.get<string>('SECRET'),
              signOptions: {expiresIn: '86400000'},
          }),
          inject: [ConfigService],
      }),
      HelperModule,
  ]
})
export class AuthModule {}
