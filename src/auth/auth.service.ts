import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {HttpService} from '@nestjs/axios';

import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create_user.dto";
import {User} from '../users/users.model';


class AxiosResponse<T> {
}

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService,
                private httpService: HttpService) {
    }

    async getGoogleData(token: string): Promise<AxiosResponse<any>>{
        const userData = await this.httpService
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`)
            .toPromise();
        return {sn_uid: userData.data.id, displayName: userData.data.name};
    }

    async login(userData) {
        if (!userData.sn_uid) {
            return 'No user';
        }

        const user = await this.usersService.getUserBySNId(userData.sn_uid);
        if (user) {
            return this.getAccessToken(user);
        } else {
            const newUser = await this.registration(userData);
            return this.getAccessToken(newUser);
        }
    }

    private getAccessToken(user: User) {
        const payload = {
            id: user.id,
            sn_uid: user.sn_uid,
        };
        console.log('get access token')
        return {accessToken: this.jwtService.sign(payload)};
    }

    private async registration(dto: CreateUserDto) {
        const newUser = await this.usersService.createUser(dto);
        return newUser;
    }
}
