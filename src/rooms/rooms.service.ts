import { Injectable } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomsRepository: Repository<Room>,
    private usersService: UsersService,
  ) {}

  async create(dto: CreateRoomDto) {
    return await this.roomsRepository.save(dto);
  }

  async findOne(id: number) {
    return await this.roomsRepository.findOne({
      where: { id },
      relations: {
        users: true,
        messages: true,
      },
    });
  }

  async findAll() {
    return await this.roomsRepository.find({
      relations: {
        messages: true,
        users: true,
      },
    });
  }

  async update(
    roomId: number,
    dto: UpdateRoomDto,
    userId: number,
  ): Promise<Room> {
    const room = await this.findOne(roomId);
    const user = await this.usersService.findOne(userId);
    room.users.push(user);
    return await this.roomsRepository.save(room);
  }
}
