import { HighFiveCryptUtil } from 'hf-common-module';
import { TokenService } from "../token.service";
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { HighFiveUser } from 'hf-ds-module';
import { CredentialService } from 'src/app/hf-database/service/credential.service';
import { UserService } from 'src/app/hf-database/service/user.service';

@Injectable()
export class AuthenticationControllerService {
    private readonly logger = new Logger(AuthenticationControllerService.name);

    constructor(
        private readonly userService: UserService,
        private readonly credentialService: CredentialService,

        private readonly tokenService: TokenService
    ) { }

    public async authenticate(uid: string, pswd: string): Promise<string> {
        return await this.userService.getByUid(uid).then(async (user: HighFiveUser) => {
            const crpw = await this.credentialService.getByIdUser(user.id);
            const hash = await HighFiveCryptUtil.check(pswd, crpw.pswd);

            if (hash) {
                this.logger.log('Authentication success for: ' + uid);
                const token = await this.tokenService.getToken(user);
                return token;
            }
            
            this.logger.log('Authentication failed for: ' + uid);
            throw new UnauthorizedException('password is not correct');
        }).catch((message: string) => {
            this.logger.log('Authentication failed, user not found: ' + uid);
            throw new NotFoundException('user not found');
        });
    }

    public async verify(tk: string): Promise<HighFiveUser> {
        return await this.tokenService.verifyToken(tk).then(async (uid: HighFiveUser) => {
            return await this.userService.getById(uid.id);
        }).catch(() => {
            this.logger.log('Authentication failed, token is expired: ' + tk);
            throw new UnauthorizedException('token is expired');
        });
    }
}