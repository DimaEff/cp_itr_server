import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {Image} from "./image.model";


@Injectable()
export class ImagesService {
    constructor(@InjectModel(Image) private imagesRepository: typeof Image) {}

    async addImages(fileNames: string[], task_id) {
        console.log()
        const [images] = await this.imagesRepository
            .bulkCreate(fileNames.map(name => ({
                task_id,
                image_url: this.getPublicGoogleStoragePath(name),
            })));
        return images;
    }

    private getPublicGoogleStoragePath(fileName: string) {
        return `https://storage.googleapis.com/staging.cp-itr.appspot.com/${fileName}`;
    }
}
