import { AppDataSource } from "../../../server/serverStart"
import Message from "../entity/MessagesEntity"

const messageRepository = AppDataSource.getRepository(Message)

export default class MessagesRepository {
  async save(message: Message) {
    await messageRepository.save(message)
  }

  async getAllMessagesFromUser(username: string) {
    return await messageRepository.findBy({ username: username })
  }

  async getLastMessageFromUser(username: string) {
    return await messageRepository.findOneBy({ username: username })
  }

  async getAllMessages() {
    return await messageRepository.find()
  }
}
