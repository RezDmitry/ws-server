import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Message } from '../messages/entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../rooms/entities/room.entity';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Message, Room]),
    forwardRef(() => AuthModule),
    forwardRef(() => RoomsModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
