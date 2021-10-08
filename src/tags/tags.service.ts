import { Injectable } from '@nestjs/common';

import {CreateTagDto} from "./dto/create_tag.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Tag} from "./tag.model";


@Injectable()
export class TagsService {
    constructor(@InjectModel(Tag) private tagsRepository: typeof Tag) {}

    async getAllTags() {
        const tags = await this.tagsRepository.findAll();
        return tags;
    }

    async createTag(dto: CreateTagDto) {
        const tag = await this.tagsRepository.create(dto);
        return tag;
    }
}
