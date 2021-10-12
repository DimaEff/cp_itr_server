import {ApiProperty} from "@nestjs/swagger";


export class AddImageDto {
    @ApiProperty({example: `https://storage.googleapis.com/staging.cp-itr.appspot.com/123123.jpg`})
    readonly image_url: string;

    @ApiProperty({example: 1})
    readonly task_id: number;
}