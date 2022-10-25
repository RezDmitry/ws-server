import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '//';
import { Message } from './entities/message.entity';
import { UsersService } from '../users/users.service';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private messageRepository: typeof Message,
    private usersService: UsersService,
    private roomService: RoomsService,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    const { userId, roomId, text } = createMessageDto;
    // const author = await this.usersService.findOneById(userId);
    // const room = await this.roomService.findOne(roomId);
    return await this.messageRepository.create({ text, userId, roomId });
  }

  async findAll() {
    return await this.messageRepository.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  async remove(id: number) {
    return await this.messageRepository.destroy({ where: { id } });
  }
}
