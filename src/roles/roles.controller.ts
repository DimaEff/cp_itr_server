import {Body, Controller, Get, Param, Post} from '@nestjs/common';

import {RolesService} from "./roles.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create_role.dto";


@ApiTags('roles')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: 'Creating a role'})
    @ApiResponse({status: 200, type: Role})
    @Post()
    create(@Body() roleDto: CreateRoleDto) {
        return this.roleService.createRole(roleDto);
    }

    @ApiOperation({summary: 'Get all roles'})
    @ApiResponse({status: 200, type: Role})
    @Get()
    getAllRole() {
        return this.roleService.getAllRoles();
    }
}
