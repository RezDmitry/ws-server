import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Room } from '../../rooms/entities/room.entity';

interface MessageCreationData {
  text: string;
  author: User;
  userId: number;
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

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @ForeignKey(() => Room)
  @Column({ type: DataType.INTEGER, allowNull: false })
  roomId: number;

  @BelongsTo(() => Room)
  room: Room;
}
