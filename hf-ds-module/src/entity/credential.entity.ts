import { HighFiveBaseEntity } from "hf-database-module";
import { Column, Entity, JoinColumn,  OneToOne } from "typeorm";
import { HighFiveUser } from "./user.entity";

@Entity({
  name: 'HF_CRPW'
})
export class HighFiveCredential extends HighFiveBaseEntity {

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
    name: 'PSWD',
    type: 'varchar',
    length: 256,
    nullable: false
  })
  pswd: string;
}