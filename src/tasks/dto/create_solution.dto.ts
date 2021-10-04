import {ApiProperty} from "@nestjs/swagger";


export class CreateSolutionDto {
    @ApiProperty({example: '20x'})
    readonly text: string;

    @ApiProperty({example: 1})
    readonly task_id: number;
}