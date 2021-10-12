import {ApiProperty} from "@nestjs/swagger";


export class CheckUserSolutionDto {
    @ApiProperty({example: '20x'})
    readonly solution: string;

    @ApiProperty({example: 1})
    readonly task_id: number;

    @ApiProperty({example: 1})
    readonly user_id: number;
}