import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RoomsModule } from '../rooms/rooms.module';
import { AuthModule } from '../auth/auth.module';
import { MessagesModule } from '../messages/messages.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [EventsGateway],
  imports: [RoomsModule, AuthModule, MessagesModule, UsersModule],
})
export class EventsModule {}
