import { Injectable } from '@nestjs/common';

import {UsersService} from "../users/users.service";
import {plainToClass} from "class-transformer";
import {CreateUserDto} from "../users/dto/create_user.dto";


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }

        const user = await this.usersService.getUserBySNId(req.user.sn_uid);
        if (user) {
            return user;
        } else {
            return this.registration(req.user);
        }
    }

    private async registration(userData: any) {
        const dto = plainToClass(CreateUserDto, userData);

        const newUser = await this.usersService.createUser(dto);
        return newUser;
    }
}
