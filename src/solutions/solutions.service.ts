import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Solution} from "./solution.model";
import {CreateSolutionDto} from "../tasks/dto/create_solution.dto";


@Injectable()
export class SolutionsService {
    constructor(@InjectModel(Solution) private solutionsRepository: typeof Solution) {}

    async addSolutions(task_id: number, newSolutions: CreateSolutionDto[]) {
        const solutionsForAdding = newSolutions.map(solution => ({...solution, task_id}));
        const solutions = await Promise.all(solutionsForAdding.map(s => this.createSolution(s)));
        return solutions;
    }

    async deleteSolutions(ids: number[]) {
        await Promise.all(ids.map(id => this.deleteSolution(id)));
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
