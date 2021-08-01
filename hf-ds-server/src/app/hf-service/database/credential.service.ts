import { Injectable } from "@nestjs/common";
import { HighFiveBaseService } from "hf-database-module";
import { HighFiveCredential } from "hf-ds-module";
import { CredentialDao } from "src/app/hf-database/dao/credential.dao";

@Injectable()
export class CredentialService extends HighFiveBaseService<HighFiveCredential> {

    constructor(
        private credentialDao: CredentialDao
    ) {
        super(credentialDao);
    }

    public async getByIdUser(idUser: number): Promise<HighFiveCredential> {
        return await this.credentialDao.getByIdUser(idUser);
    }
}