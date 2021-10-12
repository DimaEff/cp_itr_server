import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {Solution} from "./solution.model";
import {CreateSolutionDto} from "../tasks/dto/create_solution.dto";
import {UserTaskSolved} from "./user-task-solved.model";
import {Task} from "../tasks/task.model";
import {CheckUserSolutionDto} from "./dto/check_user_solution.dto";
import {User} from "../users/users.model";


@Injectable()
export class SolutionsService {
    constructor(@InjectModel(Solution) private solutionsRepository: typeof Solution,
                @InjectModel(UserTaskSolved) private solvedSolutionsRepository: typeof UserTaskSolved) {
    }

    async addSolutions(task_id: number, newSolutions: string[]) {
        const solutionsForAdding = newSolutions.map(solution => ({text: solution, task_id}));
        const solutions = await this.solutionsRepository.bulkCreate(solutionsForAdding);
        return solutions;
    }

    async deleteSolutions(ids: number[]) {
        await this.solutionsRepository.destroy({
            where: {
                id: ids,
            }
        });
    }

    async checkUserSolution(dto: CheckUserSolutionDto) {
        await this.checkIsUserSolutionExistsAndThrowHttpException(dto.user_id, dto.task_id);

        const solutions = await this.findSolutionsByTaskId(dto.task_id);

        const solved = solutions.map(s => s.text).includes(dto.solution.toLowerCase());
        console.log(solved, solutions)
        const solvedObject = {solved, task_id: dto.task_id, user_id: dto.user_id};
        const userTaskSolved = await this.solvedSolutionsRepository.create(solvedObject);

        return userTaskSolved;
    }

    private async findSolutionsByTaskId(id: number) {
        const solutions = await this.solutionsRepository.findAll({
            include: [
                {
                    model: Task,
                    where: {id},
                }
            ],
            attributes: ['text'],
        });
        return solutions;
    }

    private async checkIsUserSolutionExistsAndThrowHttpException(user_id: number, task_id: number) {
        const userSolutions = await this.getUserSolution(user_id);
        const isExists = userSolutions.map(s => s.task_id).includes(task_id);

        if (isExists) {
            throw new HttpException('The user has already solved this task', HttpStatus.BAD_REQUEST);
        }
    }

    private async getUserSolution(user_id: number) {
        const solutions = await this.solvedSolutionsRepository.findAll({
            include: [
                {
                    model: User,
                    where: {id: user_id},
                }
            ]
        });
        return solutions;
    }

    private async createSolution(dto: CreateSolutionDto) {
        const solution = await this.solutionsRepository.create({...dto, text: dto.text.toLowerCase()});
        return solution;
    }

    private async deleteSolution(id: number) {
        try {
            const solution = await this.solutionsRepository.findByPk(id);
            await solution.destroy();
        } catch (e) {
            throw new HttpException('Solution not found', HttpStatus.NOT_FOUND);
        }
    }
}
