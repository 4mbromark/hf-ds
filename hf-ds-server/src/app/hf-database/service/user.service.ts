import { HighFiveUser } from 'hf-ds-module';
import { HighFiveBaseService } from 'hf-database-module';
import { BadRequestException, Injectable } from "@nestjs/common";
import { UserDao } from "src/app/hf-database/dao/user.dao";

@Injectable()
export class UserService extends HighFiveBaseService<HighFiveUser> {
    protected name: string = 'user';

    constructor(
        private readonly userDao: UserDao
    ) {
        super(userDao);
    }

    public async getByUid(uid: string): Promise<HighFiveUser> {
        const user = await this.userDao.getByUid(uid);
        return this.returnOrFail(user, { name: 'uid', value: uid });
    }
}