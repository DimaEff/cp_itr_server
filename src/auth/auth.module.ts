import {forwardRef, Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {HelperModule} from "../helper/helper.module";
import {GoogleAuthenticationService} from "./google_auth.service";
import {VkAuthService} from "./vk_auth.service";


@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthenticationService, VkAuthService, JwtStrategy],
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
      HttpModule,
  ]
})
export class AuthModule {}
