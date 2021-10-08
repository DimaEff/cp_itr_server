import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {plainToClass} from "class-transformer";

import {CreateTaskDto} from "./dto/create_task.dto";
import {Task} from "./task.model";
import {DeleteTaskDto} from "./dto/delete_task.dto";
import {CreateOrUpdateDto} from "./dto/create_or_update_task.dto";
import {SolutionsService} from "../solutions/solutions.service";
import {FilterGetAllDto} from "./dto/filter_get_all.dto";
import {User} from "../users/users.model";
import {Theme} from "../themes/theme.model";
import {Tag} from "../tags/tag.model";
import {Solution} from "../solutions/solution.model";
import {HelperService} from "../helper/helper.service";
import {PaginationDto} from "../helper/dto/pagination.dto";


@Injectable()
export class TasksService {
    constructor(@InjectModel(Task) private tasksRepository: typeof Task,
                private solutionService: SolutionsService,
                private helperService: HelperService) {}

    async getAllTasks(query: FilterGetAllDto) {
        const themeWhere = {};
        if (query.theme) {
            themeWhere['title'] = query.theme;
        }

        const paginationQuery = plainToClass(PaginationDto, query);
        const pagination = this.helperService.getPaginationValues(paginationQuery)

        const tasks = await this.tasksRepository
            .findAndCountAll({
                ...pagination,
                distinct: true,
                include: [
                    {
                        model: User,
                        attributes: ['id', 'sn_uid', 'user_name'],
                    },
                    {
                        model: Theme,
                        where: themeWhere,
                        attributes: ['id', 'title'],
                    },
                    {
                        model: Tag,
                        attributes: ['id', 'title'],
                    },
                    {
                        model: Solution,
                        attributes: ['id', 'text'],
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
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
