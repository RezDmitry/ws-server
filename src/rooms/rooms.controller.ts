import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(@Body() dto: CreateRoomDto, @Req() req) {
    const room = await this.roomsService.create(dto);
    return await this.roomsService.addUserToRoom(room.id, req.user.id);
  }

  @Post(':id/connect')
  async connect(@Param('id') id: string, @Req() req) {
    return await this.roomsService.addUserToRoom(+id, req.user.id);
  }

  @Get()
  async getAll() {
    return await this.roomsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.roomsService.findOne(+id);
  }
}
