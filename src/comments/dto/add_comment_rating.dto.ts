import {ApiProperty} from "@nestjs/swagger";


export class AddCommentRatingDto {
    @ApiProperty({example: 1, description: 'Rating must be 1 or -1'})
    readonly rating: number;

    @ApiProperty({example: 1})
    readonly comment_id: number;

    @ApiProperty({example: 1})
    readonly user_id: number;
}