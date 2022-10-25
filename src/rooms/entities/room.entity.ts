import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';
import { UserRooms } from './user-rooms.entity';

interface RoomCreationData {
  title: string;
}

@Table({ tableName: 'rooms' })
export class Room extends Model<Room, RoomCreationData> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'Комната' })
  title: string;

  @BelongsToMany(() => User, () => UserRooms)
  users: User[];

  @HasMany(() => Message)
  messages: Message[];
}
