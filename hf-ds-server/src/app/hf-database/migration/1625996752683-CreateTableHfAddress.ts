import {MigrationInterface, QueryRunner} from "typeorm";
import * as fs from 'fs';
import { join } from "path";

export class CreateTableHfAddress1625996752683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        /* const script = fs.readFileSync(join(__dirname + '/script/003-CreateTableHfAddress.sql'), 'utf8');
        queryRunner.query(script); */
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
