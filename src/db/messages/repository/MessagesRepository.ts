import { AppDataSource } from '../../../server/datasource-config';
import Message from '../entity/Message.entity';
import { MessagesNotFoundError } from '../errors/MessageErrors';

export default class MessagesRepository {
  constructor(
    private readonly messageRepository = AppDataSource.getRepository(Message),
  ) {}

  async save(message: Message): Promise<void> {
    await this.messageRepository.save(message);
  }

  async getAllMessagesFromUser(
    username: string,
    chatid: number,
  ): Promise<Message[] | MessagesNotFoundError> {
    const messages = await this.messageRepository.findBy({ username, chatid });

    if (messages.length === 0) {
      throw new MessagesNotFoundError('No messages found for that user');
    }

    return messages;
  }

  async getLastMessageFromUser(
    username: string,
    chatid: number,
  ): Promise<Message | MessagesNotFoundError> {
    const message = await this.messageRepository.findOneBy({
      username,
      chatid,
    });
    if (message === null) {
      throw new MessagesNotFoundError('No message found for that user');
    }

    return message;
  }

  async getAllMessages(): Promise<Message[]> {
    return await this.messageRepository.find();
  }
}
