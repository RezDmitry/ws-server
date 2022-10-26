import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(@Body() dto: CreateRoomDto) {
    return await this.roomsService.create(dto);
  }

  @Get()
  async getAll() {
    return await this.roomsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.roomsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRoomDto,
    @Req() req,
  ) {
    return await this.roomsService.update(+id, dto, req.user.id);
  }
}
