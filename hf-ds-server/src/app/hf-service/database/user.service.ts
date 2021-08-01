import { HighFiveUser } from 'hf-ds-module';
import { HighFiveBaseService } from 'hf-database-module';
import { Injectable } from "@nestjs/common";
import { UserDao } from "src/app/hf-database/dao/user.dao";

@Injectable()
export class UserService extends HighFiveBaseService<HighFiveUser> {

    constructor(
        private userDao: UserDao
    ) {
        super(userDao);
    }

    public async getByUid(uid: string): Promise<HighFiveUser> {
        return await this.userDao.getByUid(uid);
    }
}