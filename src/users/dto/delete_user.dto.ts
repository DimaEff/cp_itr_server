import {ApiProperty} from "@nestjs/swagger";


export class DeleteUserDto {
    @ApiProperty({example: 1})
    readonly user_id: number;
}