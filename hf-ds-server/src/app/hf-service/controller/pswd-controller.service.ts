import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { HighFiveCredential, HighFiveUser } from 'hf-ds-module';
import { HighFiveCryptUtil } from "hf-common-module";
import { CredentialService } from 'src/app/hf-database/service/credential.service';
import { UserService } from 'src/app/hf-database/service/user.service';

@Injectable()
export class PswdControllerService {
    private readonly logger = new Logger(PswdControllerService.name);

    constructor(
        private readonly userService: UserService,
        private readonly credentialService: CredentialService
    ) {}

    public async add(idUser: number, pswd: string): Promise<void> {
        const user = await this.userService.getById(idUser);

        if (user) {
            let crpw = await this.credentialService.getByIdUser(idUser)

            if (crpw) {
                this.logger.log('Password saving failed, already processed: ' + idUser);
                throw new ConflictException('already processed');
            }

            const hash = await HighFiveCryptUtil.encrypt(pswd);
            crpw = new HighFiveCredential();
            crpw.idUser = idUser;
            crpw.pswd = hash;
            
            return await this.credentialService.insert(crpw);
        }

        this.logger.log('Password saving failed, user not found: ' + idUser);
        throw new NotFoundException('user not found');
    }

    public async change(idUser: number, oldPswd: string, newPswd: string): Promise<void> {
        const user = await this.userService.getById(idUser);
        let crpw = await this.credentialService.getByIdUser(idUser);

        if (user && crpw) {
            const check = await HighFiveCryptUtil.check(oldPswd, crpw.pswd);

            if (check) {
                const hash = await HighFiveCryptUtil.encrypt(newPswd);
                crpw.pswd = hash;
                return await this.credentialService.update(crpw);
            }

            this.logger.log('Password changing failed, password is not correct: ' + idUser);
            throw new UnauthorizedException('password is not correct');
        }

        this.logger.log('Password changing failed, data not found: ' + idUser);
        throw new NotFoundException('data not found');
    }
}