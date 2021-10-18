import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {User} from "./users.model";
import {CreateUserDto} from "./dto/create_user.dto";
import {RolesService} from "../roles/roles.service";
import {AddUserRoleDto} from "./dto/add_user_role.dto";
import {SetUserBannedDto} from "./dto/set_user_banned.dto";
import {DeleteUserDto} from "./dto/delete_user.dto";
import {PaginationDto} from "../helper/dto/pagination.dto";
import {HelperService} from "../helper/helper.service";
import {Role} from "../roles/roles.model";


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersRepository: typeof User,
                private roleService: RolesService,
                private helperService: HelperService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.usersRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers(query: PaginationDto) {
        const pagination = this.helperService.getPaginationValues(query);

        const users = await this.usersRepository
            .findAndCountAll({
                ...pagination,
                distinct: true,
                attributes: ['id', 'user_name'],
            });
        return users;
    }

    async getUser(id: string) {
        const user = await this.usersRepository
            .findByPk(id, {
                include: [
                    {
                        model: Role,
                        attributes: ['id', 'value'],
                        through: {
                            attributes: [],
                        }
                    },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'sn_uid'],
                }
            });
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

    async delete(id: number) {
        try {
            const user = await this.usersRepository.findByPk(id);
            await user.destroy();
        } catch (e) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }
}