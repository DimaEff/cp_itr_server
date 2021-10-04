import {ApiProperty} from "@nestjs/swagger";


export class DeleteTaskDto {
    @ApiProperty({example: 1})
    readonly task_id: number;
}