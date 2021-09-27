import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

import {AuthService} from "./auth.service";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    @Get('/google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req);
    }
}
