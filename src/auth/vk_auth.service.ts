import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';

import {ConfigService} from '@nestjs/config';
import {AuthTokenDto} from "./dto/token.dto";


@Injectable()
export class VkAuthService {
    clientId;
    clientSecret;
    redirectUri;

    constructor(private readonly configService: ConfigService,
                private readonly httpService: HttpService) {
        this.clientId = this.configService.get('VK_CLIENT_ID');
        this.clientSecret = this.configService.get('VK_SECRET');
        this.redirectUri = this.configService.get('VK_REDIRECT_URI');
    }

    async getVkToken(dto: AuthTokenDto): Promise<any> {
        return this.httpService
            .get(
                `https://oauth.vk.com/access_token?client_id=${this.clientId}&client_secret=${this.clientSecret}&redirect_uri=${this.redirectUri}&code=${dto.token}`
            )
            .toPromise();
    }

    async getUserDataFromVk(userId: string, token: string): Promise<any> {
        const data = await this.httpService
            .get(
                `https://api.vk.com/method/users.get?user_ids=${userId}&fields=nickname&access_token=${token}&v=5.120`
            )
            .toPromise();
        const {first_name, last_name, id} = data.data.response[0];
        const user_name = `${first_name} ${last_name}`;

        return {sn_uid: id.toString(), user_name};
    }
}