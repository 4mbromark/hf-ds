import { HighFiveUser } from 'hf-ds-module';
import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { HighFiveMailMessage, HighFiveMailSenderService } from 'hf-mail-module';
import { CredentialService } from 'src/app/hf-database/service/credential.service';
import { UserService } from 'src/app/hf-database/service/user.service';

@Injectable()
export class UserControllerService {
    private readonly logger = new Logger(UserControllerService.name);

    constructor(
        private readonly userService: UserService,
        private readonly credentialService: CredentialService,

        private readonly mailSenderService: HighFiveMailSenderService
    ) {}

    public async getById(id: number): Promise<HighFiveUser> {
        return await this.userService.getById(id).catch((message: string) => {
            this.logger.log('Getting user failed, user not found: ' + id);
            throw new NotFoundException('user not found');
        });
    }

    public async exists(uid: string): Promise<HighFiveUser> {
        return await this.userService.getByUid(uid).catch((message: string) => {
            this.logger.log('Getting user failed, user not found: ' + uid);
            throw new NotFoundException('user not found');
        });
    }

    public async create(user: HighFiveUser): Promise<HighFiveUser> {
        await this.checkDuplicate(user.emailAddress, user.username);

        const newUser = await this.userService.insertReturningEntity(user);

        const message: HighFiveMailMessage = new HighFiveMailMessage();
        message.to = [user.emailAddress];
        message.from = { name: 'Narwhale Headquarters', address: 'headquarters@narwhale.it'} ;
        message.subject = 'Utente registrato prova';
        await this.mailSenderService.newTextMessage(message, 'prova').catch(() => {
            this.logger.error('Unable to send mail: ' + message.to);
            throw new InternalServerErrorException('unable to send mail');
        });

        return newUser;
    }

    private async checkDuplicate(emailAddress: string, username: string): Promise<void> {
        await this.exists(emailAddress).then((user: HighFiveUser) => {
            this.logger.log('Creating user failed, mail alredy exists: ' + user.emailAddress);
            throw new ConflictException('mail already exists');
        }).catch((e: Error) => {
            if (!(e instanceof NotFoundException)) throw e;
        });

        await this.exists(username).then((user: HighFiveUser) => {
            this.logger.log('Creating user failed, username alredy exists: ' + user.username);
            throw new ConflictException('username already exists');
        }).catch((e: Error) => {
            if (!(e instanceof NotFoundException)) throw e;
        });
    }

    public async delete(id: number): Promise<void> {
        const user = await this.getById(id);
        const credential = await this.credentialService.getByIdUser(user.id);
        
        await this.credentialService.deleteByEntity(credential);
        await this.userService.deleteByEntity(user);
    }
}