import {ExecutionContext, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class HelperService {
    constructor(private jwtService: JwtService) {}

    getUserDateByBearerToken(context: ExecutionContext) {
        try {
            const req = context.switchToHttp().getRequest();
            const authorization = req.headers.authorization;
            const token = authorization?.split(' ')[1];

            const userByToken = this.jwtService.verify(token);
            req.user = userByToken;

            return userByToken;
        } catch (e) {
            console.log(e)
        }
    }
}
