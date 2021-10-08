import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Solution} from "./solution.model";
import {CreateSolutionDto} from "../tasks/dto/create_solution.dto";
import {plainToClass} from "class-transformer";
import {Op} from "sequelize";


@Injectable()
export class SolutionsService {
    constructor(@InjectModel(Solution) private solutionsRepository: typeof Solution) {
    }

    async addSolutions(task_id: number, newSolutions: CreateSolutionDto[]) {
        const solutionsForAdding = newSolutions.map(solution => ({...solution, task_id}));
        console.log(solutionsForAdding);
        const solutions = await this.solutionsRepository.bulkCreate(solutionsForAdding);
        return solutions;
    }

    async deleteSolutions(ids: number[]) {
        await this.solutionsRepository.destroy({
            where: {
                id: {[Op.in]: ids},
            }
        });
        // await Promise.all(ids.map(id => this.deleteSolution(id)));
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
