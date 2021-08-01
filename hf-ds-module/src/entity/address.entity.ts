import { HighFiveBaseEntity } from 'hf-database-module';
import { Column, JoinColumn, OneToOne } from 'typeorm';
import { HighFiveUser } from '..';

export class HighFiveAddress extends HighFiveBaseEntity {

    @OneToOne(() => HighFiveUser, (HighFiveUser) => HighFiveUser.id)
    @JoinColumn({
        name: 'ID_USER'
    })
    @Column({
        name: 'ID_USER',
        type: 'number',
        nullable: false
    })
    idUser: number;

    @Column({
        name: 'FULL_NAME',
        type: 'varchar',
        length: 200,
        nullable: false
    })
    fullName: string;

    @Column({
        name: 'STREET',
        type: 'varchar',
        length: 300,
        nullable: false
    })
    street: string;

    @Column({
        name: 'POSTAL_CODE',
        type: 'varchar',
        length: 100,
        nullable: false
    })
    addressPostalCode: string;

    @Column({
        name: 'CITY',
        type: 'varchar',
        length: 200,
        nullable: false
    })
    city: string;

    @Column({
        name: 'PROVINCE',
        type: 'varchar',
        length: 100,
        nullable: false
    })
    addressProvince: string;

    @Column({
        name: 'ADDITIONAL_INFO',
        type: 'varchar',
        length: 400,
        default: false
    })
    additionalInfo: string;
}