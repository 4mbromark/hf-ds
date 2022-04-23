import { HighFiveApp } from './app.entity';
import { HighFiveBaseEntity } from "hf-database-module";
import { AppPermit } from "src/app/app-permit";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity({
    name: 'HF_PERMIT'
})
export class HighFivePermit extends HighFiveBaseEntity {

    @Column({
        name: 'ID_APP',
        type: 'bigint',
        nullable: false
    })
    idApp: number;

    @Column({
        name: 'CODE',
        type: 'varchar',
        length: 200,
        nullable: false
    })
    code: AppPermit;
}