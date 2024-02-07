import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('chat')
export default class Chat {
  @PrimaryColumn('bigint', { name: 'chatid', nullable: false, unique: true })
  chatid: number

  @Column('varchar', { length: 255, nullable: false, unique: true, name: 'chatname' })
  chatname: string

  constructor(chatid: number, chatname: string) {
    this.chatid = chatid
    this.chatname = chatname
  }
}
