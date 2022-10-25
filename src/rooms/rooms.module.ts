import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from '../messages/entities/message.entity';
import { Room } from './entities/room.entity';
import { User } from '../users/entities/user.entity';
import { UserRooms } from './entities/user-rooms.entity';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [SequelizeModule.forFeature([User, Message, Room, UserRooms])],
})
export class RoomsModule {}