import {Injectable} from '@nestjs/common';

import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create_role.dto";
import {InjectModel} from "@nestjs/sequelize";


@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = this.roleRepository.findOne({where: {value}});
        return role;
    }

    async getAllRoles() {
        return this.roleRepository.findAll();
    }
}
