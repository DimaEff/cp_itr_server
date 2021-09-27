import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

import {ThemesService} from "./themes.service";
import {CreateThemeDto} from "./dto/create_theme.dto";
import {OnlyAdmin} from "../users/guard/only_admin.guard";
import {Theme} from "./theme.model";


@Controller('themes')
export class ThemesController {
    constructor(private themeService: ThemesService) {}

    @ApiOperation({summary: 'Creating a theme'})
    @ApiResponse({status: 200, type: Theme})
    @UseGuards(OnlyAdmin)
    @Post()
    create(@Body() dto: CreateThemeDto) {
        return this.themeService.createTheme(dto);
    }

    @ApiOperation({summary: 'Get all themes'})
    @ApiResponse({status: 200, type: [Theme]})
    @Get()
    getAll() {
        return this.themeService.getAll();
    }
}
