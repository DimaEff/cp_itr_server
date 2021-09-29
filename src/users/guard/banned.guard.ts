import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import {HelperService} from "../../helper/helper.service";
import {UsersService} from "../users.service";


@Injectable()
export class BannedGuard implements CanActivate {
    constructor(private helperService: HelperService,
                private usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const userDataByToken = this.helperService.getUserDateByBearerToken(context);
            const user = await this.usersService.getUser(userDataByToken.id);
            console.log(user.banned);

            return !user.banned;
        } catch (e) {
            throw new HttpException('Account banned', HttpStatus.FORBIDDEN);
        }
    }
}