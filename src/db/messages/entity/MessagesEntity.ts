import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({
  orderBy: {
    timestamp: 'DESC'
  }
})
export default class Message {
  @PrimaryColumn('uuid', { name: 'id', nullable: false, unique: true })
  id: number;

  @Column('varchar', { length: 255, nullable: false, name: 'username' })
  username: string;

  @Column('text', { nullable: false, name: 'message' })
  message: string;

  @Column('timestamp', { name: 'timestamp', nullable: false })
  timestamp: Date;

  @Column('bigint', { name: 'chatid', nullable: false })
  chatid: number;

  constructor(id: number, username: string, message: string, timestamp: Date, chatid: number) {
    this.id = id;
    this.username = username;
    this.message = message;
    this.timestamp = timestamp;
    this.chatid = chatid;
  }
}
