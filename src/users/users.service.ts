import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async create(dto: CreateUserDto) {
    return await this.usersRepository.save(dto);
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: {
        rooms: true,
        messages: true,
      },
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: {
        messages: true,
        rooms: true,
      },
    });
  }
}
