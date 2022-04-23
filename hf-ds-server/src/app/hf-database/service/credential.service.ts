import { Injectable } from "@nestjs/common";
import { HighFiveBaseService } from "hf-database-module";
import { HighFiveCredential } from "hf-ds-module";
import { CredentialDao } from "src/app/hf-database/dao/credential.dao";

@Injectable()
export class CredentialService extends HighFiveBaseService<HighFiveCredential> {

    constructor(
        private readonly credentialDao: CredentialDao
    ) {
        super(credentialDao);
    }

    public async getByIdUser(idUser: number): Promise<HighFiveCredential> {
        const credential = await this.credentialDao.getByIdUser(idUser);
        return this.returnOrFail(credential, { name: 'user', value: idUser });
    }
}