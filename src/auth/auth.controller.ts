import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

import {AuthService} from "./auth.service";
import {User} from "../users/users.model";
import {UsersService} from "../users/users.service";
import {AuthTokenDto} from "./dto/token.dto";
import {GoogleAuthenticationService} from "./google_auth.service";
import {VkAuthService} from "./vk_auth.service";


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
                private usersService: UsersService,
                private googleAuthService: GoogleAuthenticationService,
                private vkAuthService: VkAuthService) {}

    @Post('google')
    async googleAuth(@Body() token: AuthTokenDto, @Req() req: any): Promise<any> {
        await this.googleAuthService.verify(token.token);
        const userData = await this.authService.getGoogleData(token.token);
        return this.authService.login(userData);
    }

    @Post('vk')
    async vkAuth(@Body() dto: AuthTokenDto) {
        const accInfo = await this.vkAuthService.getVkToken(dto);
        const {user_id, access_token} = accInfo.data;
        const userData = await this.vkAuthService.getUserDataFromVk(user_id, access_token);
        return this.authService.login(userData);
    }

    @ApiOperation({summary: 'Get profile of current user'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    getProfile(@Req() req) {
        return this.usersService.getUser(req.user.id);
    }
}
