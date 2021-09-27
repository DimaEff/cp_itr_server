import {ApiProperty} from "@nestjs/swagger";


export class CreateThemeDto {
    @ApiProperty({example: 'it'})
    readonly title: string;
}