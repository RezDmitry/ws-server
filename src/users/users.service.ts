import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async findOne(username: string) {
    return await this.userRepository.findOne({
      where: { username },
      include: { all: true },
    });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }
}
