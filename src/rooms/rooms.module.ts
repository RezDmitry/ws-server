import { forwardRef, Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Message } from '../messages/entities/message.entity';
import { Room } from './entities/room.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    TypeOrmModule.forFeature([User, Message, Room]),
    forwardRef(() => UsersModule),
  ],
  exports: [RoomsService],
})
export class RoomsModule {}
