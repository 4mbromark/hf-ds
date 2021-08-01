import { TokenService } from './../../hf-service/token.service';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtStrategy') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExipation: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: string) {
        return payload;
    }
}