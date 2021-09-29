import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {plainToClass} from "class-transformer";

import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create_user.dto";
import {User} from '../users/users.model';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    async login(req) {
        if (!req.user) {
            return 'No user';
        }

        const user = await this.usersService.getUserBySNId(req.user.sn_uid);
        if (user) {
            return this.getAccessToken(user);
        } else {
            const newUserObj = this.registration(req.user);

            const newUser = plainToClass(User, newUserObj);
            return this.getAccessToken(newUser);
        }
    }

    private getAccessToken(user: User) {
        const payload = {
            id: user.id,
            sn_uid: user.sn_uid,
        };

        return {accessToken: this.jwtService.sign(payload)};
    }

    private async registration(userData: any) {
        const dto = plainToClass(CreateUserDto, userData);

        const newUser = await this.usersService.createUser(dto);
        return newUser;
    }
}
