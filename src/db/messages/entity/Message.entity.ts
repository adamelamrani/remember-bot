import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('message', {
  orderBy: {
    timestamp: 'DESC',
  },
})
export default class Message {
  @PrimaryColumn('uuid', { name: 'id', nullable: false, unique: true })
  id: string;

  @Column('bigint', { nullable: false, name: 'userid' })
  userid: number;

  @Column('varchar', { length: 255, nullable: true, name: 'username' })
  username: string;

  @Column('varchar', { length: 255, nullable: true, name: 'firstName' })
  firstName: string;

  @Column('text', { nullable: false, name: 'message' })
  message: string;

  @Column('timestamp', { name: 'timestamp', nullable: false })
  timestamp: Date;

  @Column('bigint', { name: 'chatid', nullable: false })
  chatid: number;

  constructor(
    id: string,
    username: string,
    firstName: string,
    message: string,
    timestamp: Date,
    chatid: number,
    userid: number,
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.message = message;
    this.timestamp = timestamp;
    this.chatid = chatid;
    this.userid = userid;
  }
}
