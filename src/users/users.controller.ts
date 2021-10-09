import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

import {CreateUserDto} from "./dto/create_user.dto";
import {UsersService} from "./users.service";
import {User} from "./users.model";
import {OnlyAdmin} from "./guard/only_admin.guard";
import {AuthGuard} from "@nestjs/passport";
import {AddUserRoleDto} from "./dto/add_user_role.dto";
import {SetUserBannedDto} from "./dto/set_user_banned.dto";
import {BannedGuard} from "./guard/banned.guard";
import {DeleteUserDto} from "./dto/delete_user.dto";
import {PaginationDto} from "../helper/dto/pagination.dto";


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
    @UseGuards(BannedGuard)
    @UseGuards(OnlyAdmin)
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAll(@Query() query: PaginationDto) {
        return this.usersService.getAllUsers(query);
    }

    @ApiOperation({summary: 'Get a user by social network id'})
    @ApiResponse({status: 200, type: User})
    @Get('/:sn_uid')
    getUserBySNId(@Param('sn_uid') sn_uid: string) {
        return this.usersService.getUserBySNId(sn_uid);
    }

    @ApiOperation({summary: 'Set role of a user'})
    @ApiResponse({status: 200})
    @Post('/role')
    setRole(@Body() dto: AddUserRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Set is banned of a user'})
    @ApiResponse({status: 200, type: SetUserBannedDto})
    @Post('/ban')
    setBanned(@Body() dto: SetUserBannedDto) {
        return this.usersService.setBanned(dto);
    }

    @UseGuards(OnlyAdmin)
    @ApiOperation({summary: 'Delete a user'})
    @ApiResponse({status: 200})
    @Post('/delete')
    deleteUser(@Body() dto: DeleteUserDto) {
        return this.usersService.delete(dto);
    }
}