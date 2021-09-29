import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

import {HelperService} from './helper.service';


@Module({
    providers: [HelperService],
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get<string>('SECRET') || 'SECRET1',
                signOptions: {
                    expiresIn: '24h',
                },
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [
        HelperService,
    ]
})
export class HelperModule {
}
