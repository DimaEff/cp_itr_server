import {ApiProperty} from "@nestjs/swagger";


export class AddIsSolvedDto {
    @ApiProperty({example: true})
    readonly solved: boolean;

    @ApiProperty({example: 1})
    readonly task_id: string;

    @ApiProperty({example: 1})
    readonly user_id: string;
}