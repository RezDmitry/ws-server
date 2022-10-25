import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './entities/message.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import {RoomsModule} from "../rooms/rooms.module";

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    SequelizeModule.forFeature([User, Message]),
    AuthModule,
    UsersModule,
    RoomsModule
  ],
})
export class MessagesModule {}
