import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, Profile, VerifyCallback} from "passport-vkontakte";

import {HelperService} from "../../helper/helper.service";


@Injectable()
export class VkontakteStrategy extends PassportStrategy(Strategy, "vkontakte") {
    constructor(private helperService: HelperService) {
        super({
            clientID: process.env.VK_CLIENT_ID,
            clientSecret: process.env.VK_SECRET,
            callbackURL: process.env.VK_REDIRECT_URI,
            scope: ['profile'],
        });
    }

    async verifyCallback(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
        const payload = this.helperService.createAuthPayload(profile);

        done(null, payload);
    }
}