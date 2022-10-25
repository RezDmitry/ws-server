import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './entities/message.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private messageRepository: typeof Message,
    private usersService: UsersService,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    const { userId, roomId, text } = createMessageDto;
    const author = await this.usersService.findOneById(userId);
    return await this.messageRepository.create({ text, author, userId });
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
