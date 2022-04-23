import { PermitDao } from './../../hf-database/dao/permit.dao';
import { HighFivePermit } from './../../hf-database/entity/permit.entity';
import { AppDao } from './../../hf-database/dao/app.dao';
import { HighFiveApp } from './../../hf-database/entity/app.entity';
import { Injectable } from "@nestjs/common";
import { HighFiveBaseService } from "hf-database-module";

@Injectable()
export class PermitService extends HighFiveBaseService<HighFivePermit> {

    constructor(
        private readonly permitDao: PermitDao
    ) {
        super(permitDao);
    }

    public async getByIdApp(idApp: number): Promise<HighFivePermit[]> {
        return await this.permitDao.getByIdApp(idApp);
    }
}