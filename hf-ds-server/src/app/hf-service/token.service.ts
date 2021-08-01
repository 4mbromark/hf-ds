import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HighFiveUser } from 'hf-ds-module';

@Injectable()
export class TokenService {

    constructor(
        private jwtService: JwtService
    ) {}

    public async getToken(user: HighFiveUser): Promise<string> {
        const ult = {
            id: user.id,
            email: user.emailAddress
        }

        return new Promise(async (resolve, rejects) => {
            const token = await this.jwtService.sign(ult, { expiresIn: process.env.JWT_EXPIRATION });
            resolve(token);
        });
    }

    public async verifyToken(token: string): Promise<HighFiveUser> {
        let masterUser = null;

        return new Promise(async (resolve, rejects) => {
            try {
                masterUser = await this.jwtService.verify(token);
            } catch (error) {
                // TODO
            }
            resolve(masterUser);
        });
    }
}