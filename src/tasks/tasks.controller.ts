import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

import {CreateTaskDto} from "./dto/create_task.dto";
import {TasksService} from "./tasks.service";
import {Task} from "./task.model";
import {DeleteTaskDto} from "./dto/delete_task.dto";
import {CreateSolutionDto} from "./dto/create_solution.dto";
import {Solution} from "./solution.model";



@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @ApiOperation({summary: 'Get all tasks'})
    @ApiResponse({status: 200, type: [Task]})
    @Get()
    getAll() {
        return this.tasksService.getAllTasks();
    }

    @ApiOperation({summary: 'Creating a task'})
    @ApiResponse({status: 200, type: Task})
    @UseGuards(AuthGuard('jwt'))
    @Post()
    createTask(@Body() dto: CreateTaskDto) {
        return this.tasksService.createTask(dto);
    }

    @ApiOperation({summary: 'Delete a task'})
    @ApiResponse({status: 200})
    @UseGuards(AuthGuard('jwt'))
    @Post('/delete')
    deleteTask(@Body() dto: DeleteTaskDto) {
        return this.tasksService.deleteTask(dto);
    }

    @ApiOperation({summary: 'Creating a solution'})
    @ApiResponse({status: 200, type: [Solution]})
    @UseGuards(AuthGuard('jwt'))
    @Post('/solutions')
    createSolution(@Body() dtos: CreateSolutionDto[]) {
        return this.tasksService.addSolutions(dtos);
    }
}
