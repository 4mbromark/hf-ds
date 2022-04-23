import { HighFivePermit } from './../entity/permit.entity';
import { HighFiveApp } from './../entity/app.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HighFiveBaseDao } from "hf-database-module";
import { Repository } from "typeorm";

@Injectable()
export class PermitDao extends HighFiveBaseDao<HighFivePermit> {

    constructor(
        @InjectRepository(HighFivePermit) private readonly permitsRepository: Repository<HighFivePermit>,
    ) {
        super(permitsRepository);
    }

    public async getByIdApp(idApp: number): Promise<HighFivePermit[]> {
        const permits = await this.permitsRepository.createQueryBuilder('permit')
        .where("permit.idApp = :idApp", { idApp: idApp })
        .getMany();

        return permits;
    }
}