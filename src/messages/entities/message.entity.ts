import { User } from '../../users/entities/user.entity';
import { Room } from '../../rooms/entities/room.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.messages)
  author: User;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;
}
