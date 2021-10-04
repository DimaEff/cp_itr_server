import {forwardRef, Module, Post} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRole} from "../roles/user_role.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {HelperModule} from "../helper/helper.module";
import {Task} from "../tasks/task.model";


@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRole, Task]),
        RolesModule,
        forwardRef(() => AuthModule),
        HelperModule,
    ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}