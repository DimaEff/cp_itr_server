import {ApiProperty} from "@nestjs/swagger";


export class AddCommentDto {
    @ApiProperty({example: 'java script'})
    readonly text: string;

    @ApiProperty({example: 1})
    readonly task_id: number;

    @ApiProperty({example: 1})
    readonly user_id: number;
}