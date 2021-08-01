import { HighFiveUser } from 'hf-ds-module';
import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../database/user.service';
import { validate, validateOrReject } from 'class-validator';

@Injectable()
export class UserControllerService {
    private readonly logger = new Logger(UserControllerService.name);

    constructor(
        private userService: UserService,
    ) {}

    public async getById(id: number): Promise<HighFiveUser> {
        const user = await this.userService.getById(id);

        if (user) {
            return user;
        }

        throw new NotFoundException();
    }

    public async exists(uid: string): Promise<HighFiveUser> {
        const user = await this.userService.getByUid(uid);

        if (user) {
            return user;
        }

        throw new NotFoundException();
    }

    public async create(user: HighFiveUser): Promise<HighFiveUser> {
        if (await this.userService.getByUid(user.emailAddress) || await this.userService.getByUid(user.username)) {
            throw new ConflictException();
        }

        const newUser = await this.userService.insertReturningEntity(user);
        return newUser;
    }

    public async delete(id: number): Promise<void> {
        const user = await this.getById(id);
        await this.userService.deleteByEntity(user);
    }
}