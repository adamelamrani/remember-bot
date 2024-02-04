import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export default class Message {

  @PrimaryColumn("uuid", { name: "id", nullable: false, unique: true })
  id: number;

  @Column("varchar", { length: 255, nullable: false, unique: true, name: "username" })
  username: string;
}