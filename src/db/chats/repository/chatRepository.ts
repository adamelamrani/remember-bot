import { AppDataSource } from '../../../server/serverStart'
import Chat from '../entity/ChatsEntity'

const chatRepository = AppDataSource.getRepository(Chat)

export default class ChatRepository {
  async save(chat: Chat): Promise<void> {
    await chatRepository.save(chat)
  }

  async getChatById(id: number): Promise<Chat | null> {
    return await chatRepository.findOneBy({ chatid: id })
  }

  async getChatByName(name: string): Promise<Chat | null> {
    return await chatRepository.findOneBy({ chatname: name })
  }

  async getAllChats(): Promise<Chat[]> {
    return await chatRepository.find()
  }
}
