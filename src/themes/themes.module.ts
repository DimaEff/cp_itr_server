import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import {ThemesController} from './themes.controller';
import {ThemesService} from './themes.service';
import {Theme} from "./theme.model";
import {UsersModule} from "../users/users.module";
import {Task} from "../tasks/task.model";
import {TasksModule} from "../tasks/tasks.module";


@Module({
    controllers: [ThemesController],
    providers: [ThemesService],
    imports: [
        SequelizeModule.forFeature([Task, Theme]),
        UsersModule,
        TasksModule,
    ]
})
export class ThemesModule {
}
