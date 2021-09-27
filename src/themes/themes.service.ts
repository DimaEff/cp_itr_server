import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {CreateThemeDto} from "./dto/create_theme.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Theme} from "./theme.model";


@Injectable()
export class ThemesService {
    constructor(@InjectModel(Theme) private themesRepository: typeof Theme) {}

    async createTheme(dto: CreateThemeDto) {
        try {
            const theme = await this.themesRepository.create({...dto, title: dto.title.toUpperCase()});
            return theme;
        } catch (e) {
            throw new HttpException('The theme already exists', HttpStatus.BAD_REQUEST);
        }
    }

    async getAll() {
        const themes = await this.themesRepository.findAll({include: {all: true}});
        return themes;
    }
}
