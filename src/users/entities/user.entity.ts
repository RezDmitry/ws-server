import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Message } from '../../messages/entities/message.entity';
import { Room } from '../../rooms/entities/room.entity';
import { UserRooms } from '../../rooms/entities/user-rooms.entity';

interface UserCreationData {
  username: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationData> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Message, 'userId')
  messages: Message[];

  @BelongsToMany(() => Room, () => UserRooms)
  rooms: Room[];
}
