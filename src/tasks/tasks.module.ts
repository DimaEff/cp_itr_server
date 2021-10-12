import {forwardRef, Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

import {TasksController} from './tasks.controller';
import {TasksService} from './tasks.service';
import {Task} from "./task.model";
import {User} from "../users/users.model";
import {Solution} from "../solutions/solution.model";
import {SolutionsModule} from "../solutions/solutions.module";
import {Theme} from "../themes/theme.model";
import {Tag} from "../tags/tag.model";
import {TaskTag} from "./task_tag.model";
import {HelperModule} from "../helper/helper.module";
import {TagsModule} from "../tags/tags.module";
import {ImagesModule} from "../images/images.module";
import {Image} from "../images/image.model";
import {CommentsModule} from "../comments/comments.module";
import {UserCommentRating} from "../comments/user-comment-rating.model";
import {UserTaskSolved} from "../solutions/user-task-solved.model";
import {UserTaskRating} from "./user-task-rating.model";


@Module({
    controllers: [TasksController],
    providers: [TasksService],
    imports: [
        SequelizeModule.forFeature(
            [Task, User, Solution, Theme, Tag, TaskTag, Image, UserCommentRating, UserTaskSolved, UserTaskRating]
        ),
        SolutionsModule,
        HelperModule,
        TagsModule,
        ImagesModule,
        CommentsModule,
    ],
    exports: [
        TasksService,
    ]
})
export class TasksModule {
}
