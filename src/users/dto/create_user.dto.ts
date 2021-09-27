import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'wv13g1q3'})
    readonly sn_uid: string;

    @ApiProperty({example: 'Дмитрий Фоминенков'})
    readonly user_name: string;
}