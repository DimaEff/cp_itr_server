import {Controller, Get} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

import {Tag} from "./tag.model";
import {TagsService} from "./tags.service";



@Controller('tags')
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @ApiOperation({summary: 'Get all tags'})
    @ApiResponse({status: 200, type: [Tag]})
    @Get()
    getAll() {
        return this.tagsService.getAllTags();
    }
}
