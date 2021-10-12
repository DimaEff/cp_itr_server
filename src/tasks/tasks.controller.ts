import {Body, Controller, Get, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FilesInterceptor} from "@nestjs/platform-express";

import {TasksService} from "./tasks.service";
import {Task} from "./task.model";
import {DeleteTaskDto} from "./dto/delete_task.dto";
import {CreateOrUpdateDto} from "./dto/create_or_update_task.dto";
import {FilterGetAllDto} from "./dto/filter_get_all.dto";
import {PaginationDto} from "../helper/dto/pagination.dto";
import {storageConfig} from "../images/google_storage_upload_config";
import {AddCommentDto} from "../comments/dto/add_comment.dto";
import {CommentsService} from "../comments/comments.service";
import {Comment} from "../comments/comment.model";
import {UserCommentRating} from "../comments/user-comment-rating.model";
import {AddCommentRatingDto} from "../comments/dto/add_comment_rating.dto";
import {UserTaskSolved} from "../solutions/user-task-solved.model";
import {CheckUserSolutionDto} from "../solutions/dto/check_user_solution.dto";
import {SolutionsService} from "../solutions/solutions.service";
import {OnlyAdmin} from "../users/guard/only_admin.guard";
import {UserTaskRating} from "./user-task-rating.model";
import {AddTaskRatingDto} from "./dto/add_task_rating.dto";



@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService,
                private commentsService: CommentsService,
                private solutionsService: SolutionsService) {}

    @ApiOperation({summary: 'Get all tasks'})
    @ApiResponse({status: 200, type: [Task]})
    @Post()
    getAll(@Query() paginationSettings: PaginationDto, @Body() filterSettings: FilterGetAllDto) {
        return this.tasksService.getAllTasks(paginationSettings, filterSettings);
    }

    @ApiOperation({summary: 'Creating a task'})
    @ApiResponse({status: 200, type: Task})
    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    @UseInterceptors(FilesInterceptor('images', null, storageConfig))
    createTask(@UploadedFiles() images, @Body() dto: CreateOrUpdateDto) {
        return this.tasksService.createOrUpdateTask(dto, images);
    }

    @ApiOperation({summary: 'Delete a task'})
    @ApiResponse({status: 200})
    @UseGuards(AuthGuard('jwt'))
    @Post('delete')
    deleteTask(@Body() dto: DeleteTaskDto) {
        return this.tasksService.deleteTask(dto);
    }

    @ApiOperation({summary: 'Creating a task`s comment'})
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(AuthGuard('jwt'))
    @Post('/comments/create')
    addComment(@Body() dto: AddCommentDto) {
        return this.commentsService.addComment(dto);
    }

    @ApiOperation({summary: 'Get all task`s comments'})
    @ApiResponse({status: 200, type: [Comment]})
    @Get('/comments/:task_id')
    getComments(@Param('task_id') task_id: number) {
        return this.commentsService.getCommentsByTaskId(task_id);
    }

    @ApiOperation({summary: 'Add a rating by user to comment'})
    @ApiResponse({status: 200, type: UserCommentRating})
    @UseGuards(AuthGuard('jwt'))
    @Post('/comments/rating')
    addCommentRating(@Body() dto: AddCommentRatingDto) {
        return this.commentsService.addRating(dto);
    }

    @ApiOperation({summary: 'Add a rating by user to task'})
    @ApiResponse({status: 200, type: UserTaskRating})
    @UseGuards(AuthGuard('jwt'))
    @Post('/rating')
    addTaskRating(@Body() dto: AddTaskRatingDto) {
        return this.tasksService.addTaskRating(dto);
    }

    @ApiOperation({summary: 'Check solution'})
    @ApiResponse({status: 200, type: UserTaskSolved})
    @UseGuards(AuthGuard('jwt'))
    @Post('/solutions/check')
    checkSolution(@Body() dto: CheckUserSolutionDto) {
        return this.solutionsService.checkUserSolution(dto);
    }
}
