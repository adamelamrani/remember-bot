import { type Request, type Response } from 'express'
import statusSelector from '../../utils/statusSelector'
import ChatRepository from '../../db/chats/repository/chatRepository'
import type Chat from '../../db/chats/entity/Chat.entity'

interface ChatsControllerInterface {
  getChats: (req: Request, res: Response) => Promise<void>
  getChatById: (req: Request, res: Response) => Promise<void>
  addChat: (req: Request, res: Response) => Promise<void>
}

class ChatsController implements ChatsControllerInterface {
  private readonly chatRepository = new ChatRepository()

  getChats = async (req: Request, res: Response): Promise<void> => {
    res.set('Content-Type', 'application/json')
    try {
      const chatList = await this.chatRepository.getAllChats()

      console.log(statusSelector(res.statusCode)(('GET resquest to endpoint "/chat"')))
      if (chatList === undefined || chatList === null) {
        res.status(404).send(JSON.stringify({ message: 'Chat not found' }))
        return
      }
      res.status(200).send(JSON.stringify({ chatList }))
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  }

  getChatById = async (req: Request, res: Response): Promise<void> => {
    res.set('Content-Type', 'application/json')

    if (req.params.id === undefined || req.params.id === null || isNaN(Number(req.params.id))) {
      res.status(400).send(JSON.stringify({ message: 'Chat ID must be provided' }))
      return
    }

    try {
      const chat = await this.chatRepository.getChatById(Number(req.params.id))

      console.log(statusSelector(res.statusCode)(('GET resquest to endpoint "/chat"')))
      if (chat === undefined || chat === null) {
        res.status(404).send(JSON.stringify({ message: 'Chat not found' }))
        return
      }
      res.status(200).send(JSON.stringify({ chat }))
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  }

  addChat = async (req: Request, res: Response): Promise<void> => {
    const chat = req.body
    res.set('Content-Type', 'application/json')

    if (chat === undefined || chat === null) {
      res.status(400).send(JSON.stringify({ message: 'Chat group must be provided' }))
      return
    }

    if (chat.chatid === undefined || chat.chatid === null) {
      res.status(400).send(JSON.stringify({ message: 'Chat ID cannot be empty' }))
      return
    }

    if (chat.chatname === undefined || chat.chatname === null) {
      res.status(400).send(JSON.stringify({ message: 'Chat name cannot be empty' }))
      return
    }

    try {
      await this.chatRepository.save(chat as Chat)

      console.log(statusSelector(res.statusCode)((' POST resquest to endpoint "/chat"')))

      res.status(201).send(JSON.stringify({ message: 'Chat added correctly' }))
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  }
};

export default ChatsController
