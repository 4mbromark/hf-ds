import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HighFiveBaseDao } from "hf-database-module";
import { HighFiveCredential } from "hf-ds-module";
import { Repository } from "typeorm";

@Injectable()
export class CredentialDao extends HighFiveBaseDao<HighFiveCredential> {

    constructor(
        @InjectRepository(HighFiveCredential) private credentialsRepository: Repository<HighFiveCredential>,
    ) {
        super(credentialsRepository);
    }

    public async getByIdUser(idUser: number): Promise<HighFiveCredential> {
        const credential = await this.credentialsRepository.findOne({
            where: [
                { idUser: idUser }
            ]
        });
        return credential;
    }
}