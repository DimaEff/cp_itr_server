import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, VerifyCallback} from "passport-google-oauth20";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URI,
            scope: ['profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const {displayName, id} = profile;
        const user = {
            sn_uid: id,
            user_name: displayName,
            // accessToken,
        };
        done(null, user);
    }
}