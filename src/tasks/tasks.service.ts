import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {CreateTaskDto} from "./dto/create_task.dto";
import {Task} from "./task.model";
import {DeleteTaskDto} from "./dto/delete_task.dto";
import {Solution} from "./solution.model";
import {CreateSolutionDto} from "./dto/create_solution.dto";
import {CreateOrUpdateDto} from "./dto/create_or_update_task.dto";
import {plainToClass} from "class-transformer";


@Injectable()
export class TasksService {
    constructor(@InjectModel(Task) private tasksRepository: typeof Task,
                @InjectModel(Solution) private solutionsRepository: typeof Solution) {
    }

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
        console.log('start', dto)
        if (dto.task_id) {
            const deleteDto = plainToClass(DeleteTaskDto, {task_id: dto.task_id});
            await this.deleteTask(deleteDto);
        }

        const task = await this.createTask(dto.task);

        const solutions = await this.addSolutions(task.id, dto.solutions);

        task.solutions = solutions;
        return task;
    }

    async createTask(dto: CreateTaskDto) {
        console.log('create task', dto)
        try {
            const task = await this.tasksRepository.create(dto);
            return task;
        } catch (e) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async deleteTask(dto: DeleteTaskDto) {
        console.log('delete task', dto)
        try {
            const task = await this.getTask(dto.task_id);
            await task.destroy();
        } catch (e) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
    }

    async addSolutions(task_id: number, newSolutions: CreateSolutionDto[]) {
        console.log('add solutions', task_id, newSolutions)
        const solutionsForAdding = newSolutions.map(solution => ({...solution, task_id}));
        const solutions = await Promise.all(solutionsForAdding.map(s => this.createSolution(s)));
        return solutions;
    }

    private async createSolution(dto: CreateSolutionDto) {
        const solution = await this.solutionsRepository.create({...dto, text: dto.text.toLowerCase()});
        return solution;
    }
}
