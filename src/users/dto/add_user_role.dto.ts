import {ApiProperty} from "@nestjs/swagger";


export class AddUserRoleDto {
    @ApiProperty({example: 1})
    readonly user_id: number;

    @ApiProperty({example: 'ADMIN'})
    readonly value: string;
}