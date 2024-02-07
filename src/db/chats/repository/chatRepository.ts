import { AppDataSource } from '../../../server/serverStart'
import Chat from '../entity/Chat.entity'

const chatRepository = AppDataSource.getRepository(Chat)

export default class ChatRepository {
  async save(chat: Chat): Promise<void> {
    const existingChat = await chatRepository.findOneBy({ chatid: chat.chatid })
    if (existingChat !== null) {
      throw new Error('Chat already exists')
    }
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
