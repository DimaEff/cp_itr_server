import {ApiProperty} from "@nestjs/swagger";


export class AddTaskRatingDto {
    @ApiProperty({example: 1, description: 'Rating must from 1 to 5'})
    readonly rating: number;

    @ApiProperty({example: 1})
    readonly task_id: number;

    @ApiProperty({example: 1})
    readonly user_id: number;
}