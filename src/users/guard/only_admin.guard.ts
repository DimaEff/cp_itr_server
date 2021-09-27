import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import {UsersService} from "../users.service";
import {HelperService} from "../../helper/helper.service";


@Injectable()
export class OnlyAdmin implements CanActivate {
    constructor(private usersService: UsersService,
                private helperService: HelperService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const userDataByToken = this.helperService.getUserDateByBearerToken(context);
            const user = await this.usersService.getUser(userDataByToken.id);
            return user.roles.some(({value}) => value === 'ADMIN');
        } catch (e) {
            throw new HttpException('No access', HttpStatus.FORBIDDEN);
        }
    }
}