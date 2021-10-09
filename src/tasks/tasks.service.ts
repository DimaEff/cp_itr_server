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
import {TagsService} from "../tags/tags.service";


@Injectable()
export class TasksService {
    constructor(@InjectModel(Task) private tasksRepository: typeof Task,
                private solutionService: SolutionsService,
                private helperService: HelperService,
                private tagsService: TagsService) {}

    async getAllTasks(paginationSettings: PaginationDto, filterSettings: FilterGetAllDto) {
        const {themeWhere, usersWhere, tagsWhere} = this.getFilterSettings(filterSettings);

        const pagination = this.helperService.getPaginationValues(paginationSettings);

        const tasks = await this.tasksRepository
            .findAndCountAll({
                ...pagination,
                distinct: true,
                include: [
                    {
                        model: User,
                        where: usersWhere,
                        attributes: ['id', 'sn_uid', 'user_name'],
                    },
                    {
                        model: Theme,
                        where: themeWhere,
                        attributes: ['id', 'title'],
                    },
                    {
                        model: Tag,
                        where: tagsWhere,
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
            await this.solutionService
                .deleteSolutions(task.solutions.map(solution => solution.id));
        } else {
            task = await this.createTask(newTaskData);
        }

        const solutions = await this.solutionService.addSolutions(task.id, dto.solutions);
        const tags = await this.tagsService.getTagsByTitles(dto.tags);
        await task.$set('tags', tags.map(tag => tag.id));

        task.solutions = solutions;
        task.tags = tags;

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

    private getFilterSettings(filterSettings: FilterGetAllDto) {
        const themeWhere = {};
        const usersWhere = {};
        const tagsWhere = {};

        if (filterSettings.theme) themeWhere['title'] = filterSettings.theme;
        if (filterSettings.user_id) usersWhere['id'] = filterSettings.user_id;
        if (filterSettings.tags) tagsWhere['title'] = filterSettings.tags;

        return {themeWhere, usersWhere, tagsWhere};
    }
}
