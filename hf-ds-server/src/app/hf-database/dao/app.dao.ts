import { HighFiveApp } from './../entity/app.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HighFiveBaseDao } from "hf-database-module";
import { Repository } from "typeorm";

@Injectable()
export class AppDao extends HighFiveBaseDao<HighFiveApp> {

    constructor(
        @InjectRepository(HighFiveApp) private readonly appsRepository: Repository<HighFiveApp>,
    ) {
        super(appsRepository);
    }

    public async getByName(name: string): Promise<HighFiveApp> {
        const app = await this.appsRepository.createQueryBuilder('app')
        .where("app.name = :name", { name: name })
        .getOne();

        return app;
    }
}