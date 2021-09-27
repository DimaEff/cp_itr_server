import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {User} from "./users.model";
import {CreateUserDto} from "./dto/create_user.dto";
import {RolesService} from "../roles/roles.service";


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersRepository: typeof User,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.usersRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER');
        await user.$set('roles', [role.id]);
        return user;
    }

    async getAllUsers() {
        const users = await this.usersRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserBySNId(sn_uid: string) {
        const user = await this.usersRepository.findOne({where: {sn_uid}, include: {all: true}});
        return user;
    }
}