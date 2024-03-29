import {ApiProperty} from "@nestjs/swagger";


export class SetUserBannedDto {
    @ApiProperty({example: 1})
    readonly user_id: number;

    @ApiProperty({example: true})
    readonly banned: boolean;
}