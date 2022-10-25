import {Controller, Post} from '@nestjs/common';
import {RoomsService} from "./rooms.service";

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  @Post()
  async create() {
    return await this.roomService.create();
  }
}
