import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HighFiveBaseDao } from "hf-database-module";
import { HighFiveUser } from "hf-ds-module";
import { Repository } from "typeorm";

@Injectable()
export class UserDao extends HighFiveBaseDao<HighFiveUser> {

    constructor(
        @InjectRepository(HighFiveUser) private readonly usersRepository: Repository<HighFiveUser>,
    ) {
        super(usersRepository);
    }

    public async getByUid(uid: string): Promise<HighFiveUser> {
        const user = await this.usersRepository.createQueryBuilder('user')
        .where("user.username = :uid OR user.emailAddress = :uid", { uid: uid })
        .getOne();

        return user;
    }
}