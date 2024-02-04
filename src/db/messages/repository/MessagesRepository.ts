import { AppDataSource } from "../../../server/serverStart"
import Message from "../entity/MessagesEntity"

const messageRepository = AppDataSource.getRepository(Message)

export default class MessagesRepository {
  async save(message: Message) {
    await messageRepository.save(message)
  }

  async getAllMessagesFromUser(username: string, chatid: number) {
    return await messageRepository.findBy({ username: username, chatid: chatid })
  }

  async getLastMessageFromUser(username: string, chatid: number) {
    return await messageRepository.findOneBy({ username: username, chatid: chatid })
  }

  async getAllMessages() {
    return await messageRepository.find()
  }
}
