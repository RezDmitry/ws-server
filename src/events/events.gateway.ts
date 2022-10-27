import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { RoomsService } from '../rooms/rooms.service';
import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(
    private roomsService: RoomsService,
    private messagesService: MessagesService,
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  async handleEvent(@MessageBody() data) {
    const { text, roomId, userId } = data;
    await this.messagesService.create({ roomId, text }, userId);
    const room = await this.roomsService.findOne(roomId);
    this.server.emit('events', room.messages);
    return data;
  }
}
