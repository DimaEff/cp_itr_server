import {ApiProperty} from "@nestjs/swagger";


export class CreateTaskDto {
    @ApiProperty({example: 'Задачка про яблоки'})
    readonly title: string;

    @ApiProperty({example: 'Текст задачки про яблоки'})
    readonly text: string;

    @ApiProperty({example: 1})
    readonly user_id: number;
}