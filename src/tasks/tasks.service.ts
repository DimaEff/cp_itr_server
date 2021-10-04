import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {CreateTaskDto} from "./dto/create_task.dto";
import {Task} from "./task.model";
import {DeleteTaskDto} from "./dto/delete_task.dto";
import {Solution} from "./solution.model";
import {CreateSolutionDto} from "./dto/create_solution.dto";


@Injectable()
export class TasksService {
    constructor(@InjectModel(Task) private tasksRepository: typeof Task,
                @InjectModel(Solution) private solutionsRepository: typeof Solution) {}

    async getAllTasks() {
        const tasks = await this.tasksRepository
            .findAll({include: {all: true}});
        return tasks;
    }

    async createTask(dto: CreateTaskDto) {
        try {
            const task = await this.tasksRepository.create(dto);
            return task;
        } catch (e) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async deleteTask(dto: DeleteTaskDto) {
        try {
            const task = await this.tasksRepository.findByPk(dto.task_id);
            await task.destroy();
        } catch (e) {
            throw new HttpException('Task or user not found', HttpStatus.NOT_FOUND);
        }
    }

    async createSolution(dto: CreateSolutionDto) {
        const solution = await this.solutionsRepository.create({...dto, text: dto.text.toLowerCase()});
        return solution;
    }
}
