import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/entities/message.entity';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { RoomsModule } from './rooms/rooms.module';
import { UserRooms } from './rooms/entities/user-rooms.entity';
import { Room } from './rooms/entities/room.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'ws-chat',
      models: [User, Message, Room, UserRooms],
      autoLoadModels: true,
      synchronize: true,
    }),
    EventsModule,
    UsersModule,
    AuthModule,
    MessagesModule,
    RoomsModule,
  ],
})
export class AppModule {}
