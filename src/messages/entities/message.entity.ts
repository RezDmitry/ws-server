import {
  BelongsTo,
  Column,
  DataType, ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Room } from '../../rooms/entities/room.entity';

interface MessageCreationData {
  text: string;
  userId: number;
  roomId: number;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, MessageCreationData> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @BelongsTo(() => User, 'userId')
  author: User;

  @BelongsTo(() => Room, 'roomId')
  room: Room;
}
