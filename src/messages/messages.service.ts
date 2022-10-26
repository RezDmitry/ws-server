import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { UsersService } from '../users/users.service';
import { RoomsService } from '../rooms/rooms.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    private usersService: UsersService,
    private roomService: RoomsService,
  ) {}
  async create(dto: CreateMessageDto, userId: number) {
    const { roomId, text } = dto;
    const author = await this.usersService.findOne(userId);
    const room = await this.roomService.findOne(roomId);
    return await this.messagesRepository.save({ text, author, room });
  }

  async findAll() {
    return await this.messagesRepository.find({
      relations: { author: true, room: true },
    });
  }

  async findOne(id: number) {
    return await this.messagesRepository.findOne({
      where: { id },
      relations: {
        author: true,
        room: true,
      },
    });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  async remove(id: number) {
    return await this.messagesRepository.delete({ id });
  }
}
