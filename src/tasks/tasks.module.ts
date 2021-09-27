import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {Task} from "./task.model";
import {User} from "../users/users.model";
import {Solution} from "../solutions/solution.model";
import {SolutionsModule} from "../solutions/solutions.module";
import {Theme} from "../themes/theme.model";
import {ThemesModule} from "../themes/themes.module";


@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
      SequelizeModule.forFeature([Task, User, Solution, Theme]),
      SolutionsModule,
  ]
})
export class TasksModule {}
