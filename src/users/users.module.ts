import {Module, Post} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRole} from "../roles/user_role.model";
import {RolesModule} from "../roles/roles.module";


@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRole]),
        RolesModule,
    ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {
}