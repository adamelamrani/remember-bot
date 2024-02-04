import { AppDataSource } from "../../../server/serverStart"
import Chat from "../entity/ChatsEntity"

const chatRepository = AppDataSource.getRepository(Chat)

export default class ChatRepository {
  async save(chat: Chat) {
    await chatRepository.save(chat)
  }
  async getChatById(id: number) {
    return await chatRepository.findOneBy({ chatid: id })
  }

  async getChatByName(name: string) {
    return await chatRepository.findOneBy({ chatname: name })
  }

  async getAllChats() {
    return await chatRepository.find()
  }
}