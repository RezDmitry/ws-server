import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './entities/room.entity';
import { AddUserToRoomDto } from './dto/add-user-to-room.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room) private readonly roomRepository: typeof Room,
    private userService: UsersService,
  ) {}

  async create() {
    const room = await this.roomRepository.create();
    return room;
  }

  async findOne(id: number) {
    return await this.roomRepository.findOne({ where: { id } });
  }

  async addUserToRoom(dto: AddUserToRoomDto) {
    const { userId, roomId } = dto;
    const room = await this.findOne(roomId);
    const user = await this.userService.findOneById(userId);
    await user.$set('rooms', [room.id]);
  }
}
