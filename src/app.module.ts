import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";

import {UsersModule} from './users/users.module';
import {User} from "./users/users.model";
import {RolesModule} from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRole} from "./roles/user_role.model";
import { AuthModule } from './auth/auth.module';
import { HelperModule } from './helper/helper.module';
import { TasksModule } from './tasks/tasks.module';
import {Task} from "./tasks/task.model";
import {Solution} from "./tasks/solution.model";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRole, Task, Solution],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        HelperModule,
        TasksModule,
    ],
})
export class AppModule {
}