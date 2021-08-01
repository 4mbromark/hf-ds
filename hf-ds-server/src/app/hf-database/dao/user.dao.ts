import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HighFiveBaseDao } from "hf-database-module";
import { HighFiveUser } from "hf-ds-module";
import { Repository } from "typeorm";

@Injectable()
export class UserDao extends HighFiveBaseDao<HighFiveUser> {

    constructor(
        @InjectRepository(HighFiveUser) private usersRepository: Repository<HighFiveUser>,
    ) {
        super(usersRepository);
    }

    public async getByUid(uid: string): Promise<HighFiveUser> {
        const user = await this.usersRepository.findOne({
            where: [
                { username: uid },
                { emailAddress: uid }
            ]
        });
        return user;
    }
}