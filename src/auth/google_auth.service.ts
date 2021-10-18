import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {ConfigService} from '@nestjs/config';
import {google, Auth} from 'googleapis';


@Injectable()
export class GoogleAuthenticationService {
    oauthClient: Auth.OAuth2Client;

    constructor(private readonly configService: ConfigService) {
        const clientID = this.configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_SECRET');

        this.oauthClient = new google.auth.OAuth2(
            clientID,
            clientSecret
        );
    }

    async verify(token: string) {
        const userData = await this.oauthClient.getTokenInfo(token);

        if (!userData.email) {
            throw new HttpException('Token is not valid', HttpStatus.BAD_REQUEST);
        }
    }
}