import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import {TagsService} from './tags.service';
import {TagsController} from './tags.controller';
import {Task} from "../tasks/task.model";
import {Tag} from "./tag.model";
import {TaskTag} from "../tasks/task_tag.model";


@Module({
    providers: [TagsService],
    controllers: [TagsController],
    imports: [
        SequelizeModule.forFeature([Task, Tag, TaskTag]),
    ]
})
export class TagsModule {}
