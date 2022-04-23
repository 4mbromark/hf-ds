import { AppDao } from '../dao/app.dao';
import { HighFiveApp } from '../entity/app.entity';
import { Injectable } from "@nestjs/common";
import { HighFiveBaseService } from "hf-database-module";

@Injectable()
export class AppService extends HighFiveBaseService<HighFiveApp> {

    constructor(
        private readonly appDao: AppDao
    ) {
        super(appDao);
    }

    public async getByName(name: string): Promise<HighFiveApp> {
        const app = await this.appDao.getByName(name);
        return this.returnOrFail(app, { name: 'name', value: name });
    }
}