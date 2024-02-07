import { AppDataSource } from '../../../server/serverStart';
import Message from '../entity/Message.entity';
import { MessagesNotFoundError } from '../errors/MessageErrors';

const messageRepository = AppDataSource.getRepository(Message);

export default class MessagesRepository {
  async save(message: Message): Promise<void> {
    await messageRepository.save(message);
  }

  async getAllMessagesFromUser(
    username: string,
    chatid: number,
  ): Promise<Message[] | MessagesNotFoundError> {
    const messages = await messageRepository.findBy({ username, chatid });

    if (messages.length === 0) {
      throw new MessagesNotFoundError('No messages found for that user');
    }

    return messages;
  }

  async getLastMessageFromUser(
    username: string,
    chatid: number,
  ): Promise<Message | MessagesNotFoundError> {
    const message = await messageRepository.findOneBy({ username, chatid });
    if (message === null) {
      throw new MessagesNotFoundError('No message found for that user');
    }

    return message;
  }

  async getAllMessages(): Promise<Message[]> {
    return await messageRepository.find();
  }
}
