import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import {ThemesController} from './themes.controller';
import {ThemesService} from './themes.service';
import {Theme} from "./theme.model";
import {UsersModule} from "../users/users.module";
import {Task} from "../tasks/task.model";


@Module({
    controllers: [ThemesController],
    providers: [ThemesService],
    imports: [
        SequelizeModule.forFeature([Task, Theme]),
        UsersModule,
    ],
    exports: [
        ThemesService,
    ]
})
export class ThemesModule {
}
