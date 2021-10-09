import {ApiProperty} from "@nestjs/swagger";

import {CreateTaskDto} from "./create_task.dto";


export class CreateOrUpdateDto {
    @ApiProperty({example: 5})
    readonly task_id: number | undefined;

    @ApiProperty({example: 1})
    readonly task: CreateTaskDto;

    @ApiProperty({example: ['20x', '5']})
    readonly solutions: string[];

    @ApiProperty({example: ['java script', 'db']})
    readonly tags: string[];
}