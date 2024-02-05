import { AppDataSource } from '../../../server/serverStart'
import Message from '../entity/Message.entity'

const messageRepository = AppDataSource.getRepository(Message)

export default class MessagesRepository {
  async save(message: Message): Promise<void> {
    await messageRepository.save(message)
  }

  async getAllMessagesFromUser(username: string, chatid: number): Promise<Message[]> {
    return await messageRepository.findBy({ username, chatid })
  }

  async getLastMessageFromUser(username: string, chatid: number): Promise<Message | null> {
    return await messageRepository.findOneBy({ username, chatid })
  }

  async getAllMessages(): Promise<Message[]> {
    return await messageRepository.find()
  }
}
