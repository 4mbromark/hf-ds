import { TokenService } from "../token.service";
import { UserService } from "../database/user.service";
import { CredentialService } from '../database/credential.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { HighFiveCryptService } from 'hf-common-module';
import { HighFiveUser } from 'hf-ds-module';

@Injectable()
export class AuthenticationControllerService {
    private readonly logger = new Logger(AuthenticationControllerService.name);

    constructor(
        private userService: UserService,
        private credentialService: CredentialService,

        private tokenService: TokenService,
        private cryptService: HighFiveCryptService,
    ) {}

    public async authenticate(uid: string, pswd: string): Promise<string> {
        const user = await this.userService.getByUid(uid);

        if (user) {
            const crpw = await this.credentialService.getByIdUser(user.id);
            const hash = await this.cryptService.check(pswd, crpw.pswd);

            if (hash) {
                this.logger.log('Authentication success for: ' + uid);
                const token = await this.tokenService.getToken(user);
                return token;
            }

            this.logger.log('Authentication failed for: ' + uid);
            throw new UnauthorizedException('password is not correct');
        }

        this.logger.log('Authentication failed, user not found: ' + uid);
        throw new NotFoundException('user not found');
    }

    public async verify(tk: string): Promise<HighFiveUser> {
        const uid = await this.tokenService.verifyToken(tk);

        if (uid) {
            const user = await this.userService.getById(uid.id);
            return user;
        }

        throw new UnauthorizedException();
    }
}