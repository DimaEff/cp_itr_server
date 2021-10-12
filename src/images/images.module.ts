import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import { ImagesService } from './images.service';
import {Task} from "../tasks/task.model";
import {Image} from "./image.model";


@Module({
  providers: [ImagesService],
  imports: [
    SequelizeModule.forFeature([Task, Image]),
  ],
  exports: [
      ImagesService,
  ]
})
export class ImagesModule {}
