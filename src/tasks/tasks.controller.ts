import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

import {TasksService} from "./tasks.service";
import {Task} from "./task.model";
import {DeleteTaskDto} from "./dto/delete_task.dto";
import {CreateOrUpdateDto} from "./dto/create_or_update_task.dto";
import {FilterGetAllDto} from "./dto/filter_get_all.dto";
import {PaginationDto} from "../helper/dto/pagination.dto";



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
    createTask(@Body() dto: CreateOrUpdateDto) {
        console.log('controller')
        return this.tasksService.createOrUpdateTask(dto);
    }

    @ApiOperation({summary: 'Delete a task'})
    @ApiResponse({status: 200})
    @UseGuards(AuthGuard('jwt'))
    @Post('delete')
    deleteTask(@Body() dto: DeleteTaskDto) {
        return this.tasksService.deleteTask(dto);
    }
}
