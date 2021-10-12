import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import { SolutionsService } from './solutions.service';
import {Task} from "../tasks/task.model";
import {Solution} from "./solution.model";
import {UserTaskSolved} from "./user-task-solved.model";


@Module({
  providers: [SolutionsService],
  imports: [
    SequelizeModule.forFeature([Task, Solution, UserTaskSolved]),
  ],
  exports: [
      SolutionsService,
  ]
})
export class SolutionsModule {}
