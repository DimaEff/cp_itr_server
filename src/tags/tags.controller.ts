import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

import {Tag} from "./tag.model";
import {TagsService} from "./tags.service";
import {AuthGuard} from "@nestjs/passport";
import {CreateTagDto} from "./dto/create_tag.dto";



@Controller('tags')
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @ApiOperation({summary: 'Get all tags'})
    @ApiResponse({status: 200, type: [Tag]})
    @Get()
    getAll() {
        return this.tagsService.getAllTags();
    }

    @ApiOperation({summary: 'Creating a task'})
    @ApiResponse({status: 200, type: Tag})
    @UseGuards(AuthGuard('jwt'))
    @Post()
    createTask(@Body() dto: CreateTagDto) {
        return this.tagsService.createTag(dto);
    }
}
