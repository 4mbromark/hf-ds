import { HighFivePermit } from './permit.entity';
import { HighFiveBaseEntity } from "hf-database-module";
import { Entity, Column, OneToMany, JoinColumn } from "typeorm";

@Entity({
    name: 'HF_APP'
})
export class HighFiveApp extends HighFiveBaseEntity {

    @Column({
        name: 'IP',
        type: 'varchar',
        length: 200,
        nullable: false
    })
    ip: string;

    @Column({
        name: 'NAME',
        type: 'varchar',
        length: 500,
        nullable: false
    })
    name: string;

    @Column({
        name: 'TOKEN',
        type: 'varchar',
        length: 1000,
        nullable: false
    })
    token: string;
}