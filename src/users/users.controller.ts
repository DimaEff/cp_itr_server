import {Body, Controller, Get, Param, Post} from '@nestjs/common';

import {CreateUserDto} from "./dto/create_user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Creating a user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Get a user by social network id'})
    @ApiResponse({status: 200, type: User})
    @Get('/:sn_uid')
    getUserBySNId(@Param('sn_uid') sn_uid: string) {
        return this.usersService.getUserBySNId(sn_uid);
    }
}