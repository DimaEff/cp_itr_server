import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {Task} from "./task.model";
import {User} from "../users/users.model";
import {Solution} from "./solution.model";


@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
      SequelizeModule.forFeature([Task, User, Solution]),
  ]
})
export class TasksModule {}
