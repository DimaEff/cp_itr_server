import {Injectable} from '@nestjs/common';

import {InjectModel} from "@nestjs/sequelize";
import {Tag} from "./tag.model";


@Injectable()
export class TagsService {
    constructor(@InjectModel(Tag) private tagsRepository: typeof Tag) {
    }

    async getAllTags() {
        const tags = await this.tagsRepository.findAll();
        return tags;
    }

    async getTagsByTitles(tagsTitles: string[]) {
        const tags = await Promise
            .all(tagsTitles.map(title => this.findOrCreateTaskByTitle(title)));
        return tags;
    }

    async findOrCreateTaskByTitle(title: string) {
        const [tag] = await this.tagsRepository
            .findOrCreate({where: {title: title.toLowerCase()}});
        return tag;
    }
}