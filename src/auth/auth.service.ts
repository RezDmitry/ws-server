import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const candidate = await this.usersService.findOne(username);
    if (candidate) {
      throw new HttpException(
        'Такой пользователь существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await this.usersService.create({
      username,
      password: hashPassword,
    });
    return await this.login(user);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new HttpException(
        'Такого пользователя не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Имя пользователя и пароль не совпадают',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
