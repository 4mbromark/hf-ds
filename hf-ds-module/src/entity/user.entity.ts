import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNotEmptyObject, IsPhoneNumber } from "class-validator";
import { HighFiveBaseEntity } from "hf-database-module";
import { Column, Entity } from "typeorm";

@Entity({
  name: 'HF_REGUSER'
})
export class HighFiveUser extends HighFiveBaseEntity {

  @Column({
    name: 'FIRST_NAME',
    type: 'varchar',
    length: 256,
    nullable: false
  })
  @IsNotEmpty()
  firstName: string;

  @Column({
    name: 'LAST_NAME',
    type: 'varchar',
    length: 256,
    nullable: false
  })
  @IsNotEmpty()
  lastName: string;

  @Column({
    name: 'BIRTH_DATE',
    type: 'date',
    nullable: false
  })
  @IsDateString()
  birthDate: Date;

  @Column({
    name: 'EMAIL_ADDRESS',
    type: 'varchar',
    length: 256,
    unique: true,
    nullable: false
  })
  @IsEmail()
  emailAddress: string;

  @Column({
    name: 'PHONE_NUMBER',
    type: 'varchar',
    length: 256
  })
  phoneNumber: string;

  @Column({
    name: 'USERNAME',
    type: 'varchar',
    length: 256,
    unique: true,
    nullable: false
  })
  @IsNotEmpty()
  username: string;
}