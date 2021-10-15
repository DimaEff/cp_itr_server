import {ExecutionContext, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

import {PaginationDto} from "./dto/pagination.dto";


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

    getPaginationValues (paginationDto: PaginationDto, defaultLimit: number = 10, startPage: number = 0) {
        const limit = paginationDto?.limit || defaultLimit;
        const offset = ((paginationDto?.page - 1) * limit) || startPage;

        return {limit, offset};
    }

    getRatingSum(model: any, ratingsField: string = 'ratings', field: string = 'rating') {
        return model[ratingsField].reduce(((sum, rating) => sum + rating[field]), 0);
    }

    createAuthPayload(profile: any) {
        const {displayName, id} = profile;
        console.log(displayName, id)
        return {
            sn_uid: id,
            user_name: displayName,
        };
    }
}
