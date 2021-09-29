import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {User} from "./users.model";
import {CreateUserDto} from "./dto/create_user.dto";
import {RolesService} from "../roles/roles.service";
import {AddUserRoleDto} from "./dto/add_user_role.dto";
import {SetUserBannedDto} from "./dto/set_user_banned.dto";


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersRepository: typeof User,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.usersRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        const users = await this.usersRepository
            .findAll({include: {all: true}});
        return users;
    }

    async getUser(id: string) {
        const user = await this.usersRepository
            .findByPk(id, {include: {all: true}});
        return user;
    }

    async getUserBySNId(sn_uid: string) {
        const user = await this.usersRepository
            .findOne({where: {sn_uid}, include: {all: true}});
        return user;
    }

    async addRole(dto: AddUserRoleDto) {
        const user = await this.usersRepository.findByPk(dto.user_id);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (user && role) {
            await user.$add('role', role.id);
            return dto;
        }

        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async setBanned(dto: SetUserBannedDto) {
        const user = await this.usersRepository.findByPk(dto.user_id);
        user.banned = dto.banned;
        await user.save();
        return user;
    }
}