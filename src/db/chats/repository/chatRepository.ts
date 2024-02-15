import { AppDataSource } from '../../../server/datasource-config';
import Chat from '../entity/Chat.entity';
import { ChatAlreadyExistsError } from '../errors/ChatErrors';

export default class ChatRepository {
  constructor(
    private readonly chatRepository = AppDataSource.getRepository(Chat),
  ) {}

  async save(chat: Chat): Promise<void> {
    const existingChat = await this.chatRepository.findOneBy({
      chatid: chat.chatid,
    });
    if (existingChat !== null) {
      throw new ChatAlreadyExistsError('Chat already exists');
    }
    await this.chatRepository.save(chat);
  }

  async getChatById(id: number): Promise<Chat | null> {
    return await this.chatRepository.findOneBy({ chatid: id });
  }

  async getChatByName(name: string): Promise<Chat | null> {
    return await this.chatRepository.findOneBy({ chatname: name });
  }

  async getAllChats(): Promise<Chat[]> {
    return await this.chatRepository.find();
  }
}
