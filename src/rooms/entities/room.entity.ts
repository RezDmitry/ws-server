import { Message } from '../../messages/entities/message.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 'Комната',
  })
  title: string;

  @OneToMany(() => Message, (message) => message.room, {
    cascade: true,
  })
  messages: Message[];

  @ManyToMany(() => User, (user) => user.rooms)
  users: User[];
}
