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
import {Image} from "../images/image.model";
import {ImagesService} from "../images/images.service";
import {AddTaskRatingDto} from "./dto/add_task_rating.dto";
import {UserTaskRating} from "./user-task-rating.model";
import {UserTaskSolved} from "../solutions/user-task-solved.model";


@Injectable()
export class TasksService {
    constructor(@InjectModel(Task) private tasksRepository: typeof Task,
                @InjectModel(UserTaskRating) private taskRatingRepository: typeof UserTaskRating,
                private solutionService: SolutionsService,
                private helperService: HelperService,
                private tagsService: TagsService,
                private imagesService: ImagesService,) {}

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
                    {
                        model: Image,
                        attributes: ['image_url'],
                    },
                    {
                        model: UserTaskSolved,
                        attributes: ['id'],
                    },
                    {
                        model: UserTaskRating,
                        attributes: ['id'],
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

    async createOrUpdateTask(dto: CreateOrUpdateDto, images: any[]) {
        let task;
        const newTaskData = plainToClass(CreateTaskDto, dto.task);

        if (dto.task_id) {
            task = await this.updateTask(dto.task_id, newTaskData);
            await this.solutionService
                .deleteSolutions(task.solutions.map(solution => solution.id));
        } else {
            task = await this.createTask(newTaskData);
        }

        const additionalData = {
            id: task.id,
            solutions: dto.solutions,
            tags: dto.tags,
            images: images.map(img => img.filename),
        };
        await this.setAdditionalTaskData(task, additionalData);

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

    async addTaskRating(dto: AddTaskRatingDto) {
        await this.checkIsUserRatingExistsAndThrowHttpException(dto.task_id, dto.user_id);

        const rating = await this.taskRatingRepository.create(dto);
        await this.updateTotalRating(dto.task_id);
        return rating;
    }

    private async getRatingByTaskAndUserId(task_id: number, user_id: number) {
        const rating = await this.taskRatingRepository.findOne({
            include: [
                {
                    model: Task,
                    where: {id: task_id},
                },
                {
                    model: User,
                    where: {id: user_id},
                }
            ]
        });
        return rating;
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
        if (filterSettings.tags?.length > 0) tagsWhere['title'] = filterSettings.tags;

        return {themeWhere, usersWhere, tagsWhere};
    }

    private async setAdditionalTaskData(task: Task, data: any) {
        await this.solutionService.addSolutions(data.id, data.solutions);

        const tags = await this.tagsService.getTagsByTitles(data.tags);
        await task.$set('tags', tags.map(tag => tag.id));

        await this.imagesService.addImages(data.images, data.id);
    }

    private async checkIsUserRatingExistsAndThrowHttpException(task_id: number, user_id: number) {
        const rating = await this.getRatingByTaskAndUserId(task_id, user_id);

        if (rating) {
            throw new HttpException('The rating of this user already exists', HttpStatus.BAD_REQUEST);
        }
    }

    private async updateTotalRating(task_id: number) {
        const task = await this.getTask(task_id);

        const total_rating = this.helperService.getRatingSum(task) / (task.ratings.length || 1);
        task.total_rating = total_rating;
        await task.save();
    }
}