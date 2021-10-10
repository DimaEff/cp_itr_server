import {Body, Controller, Post, Query, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
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



@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

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
    @UseInterceptors(FilesInterceptor('image', null, storageConfig))
    createTask(@UploadedFiles() images, @Body() dto: CreateOrUpdateDto) {
        return this.tasksService.createOrUpdateTask(dto);
    }

    @Post('/test')
    @UseInterceptors(FilesInterceptor('image', null, storageConfig))
    upload(@UploadedFiles() images) {
        console.log(images);

        const path = `https://storage.googleapis.com/staging.cp-itr.appspot.com/${images[0].filename}`

        return `
            <div style="align-items: center">
                <img src=${path} style="height: 100px;">
            <div>
        `
    }

    @ApiOperation({summary: 'Delete a task'})
    @ApiResponse({status: 200})
    @UseGuards(AuthGuard('jwt'))
    @Post('delete')
    deleteTask(@Body() dto: DeleteTaskDto) {
        return this.tasksService.deleteTask(dto);
    }
}
