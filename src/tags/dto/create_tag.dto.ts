import {ApiProperty} from "@nestjs/swagger";


export class CreateTagDto {
    @ApiProperty({example: 'java script'})
    readonly title: string;
}