import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {GoogleStrategy} from "./strategies/google.strategy";
import {UsersModule} from "../users/users.module";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {ConfigModule, ConfigService} from "@nestjs/config";


@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
  imports: [
      UsersModule,
      ConfigModule,
      JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
              secretOrPrivateKey: configService.get<string>('SECRET') || 'SECRET1',
              signOptions: {
                  expiresIn: '24h',
              },
          }),
          inject: [ConfigService],
      }),
  ]
})
export class AuthModule {}
