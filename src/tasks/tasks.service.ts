import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {plainToClass} from "class-transformer";

import {CreateTaskDto} from "./dto/create_task.dto";
import {Task} from "./task.model";
import {DeleteTaskDto} from "./dto/delete_task.dto";
import {CreateOrUpdateDto} from "./dto/create_or_update_task.dto";
import {SolutionsService} from "../solutions/solutions.service";


@Injectable()
export class TasksService {
    constructor(@InjectModel(Task) private tasksRepository: typeof Task,
                private solutionService: SolutionsService) {}

    async getAllTasks() {
        const tasks = await this.tasksRepository
            .findAll({include: {all: true}});
        return tasks;
    }

    async getTask(id: number) {
        const task = this.tasksRepository.findByPk(id, {include: {all: true}});
        return task;
    }

    async createOrUpdateTask(dto: CreateOrUpdateDto) {
        let task;
        const newTaskData = plainToClass(CreateTaskDto, dto.task);

        if (dto.task_id) {
            task = await this.updateTask(dto.task_id, newTaskData);
            await this.solutionService.deleteSolutions(task.solutions.map(solution => solution.id));
        } else {
            task = await this.createTask(newTaskData);
        }

        const solutions = await this.solutionService.addSolutions(task.id, dto.solutions);

        task.solutions = solutions;
        return task;
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
            const task = await this.getTask(dto.task_id);
            await task.destroy();
        } catch (e) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
    }

    private async updateTask(id: number, newData: CreateTaskDto) {
        const task = await this.getTask(id);
        await task.update(newData);
        return task;
    }
}
