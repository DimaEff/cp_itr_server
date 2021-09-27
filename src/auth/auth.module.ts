import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {GoogleStrategy} from "./strategies/google.strategy";
import {UsersModule} from "../users/users.module";


@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  imports: [
      UsersModule,
  ]
})
export class AuthModule {}
