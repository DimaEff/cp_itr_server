import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

import {AuthService} from "./auth.service";
import {User} from "../users/users.model";
import {UsersService} from "../users/users.service";


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
                private usersService: UsersService) {}

    @ApiOperation({summary: 'Authenticate with Google'})
    @ApiResponse({status: 200, type: User})
    @Get('/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    @ApiExcludeEndpoint()
    @Get('/google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.authService.login(req);
    }

    @ApiOperation({summary: 'Get profile of current user'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    getProfile(@Req() req) {
        console.log(req.user, 'contr')
        return this.usersService.getUser(req.user.id);
    }
}
