import { Controller, Get, Post } from '@nestjs/common';

@Controller('tracks')
export class TracksController {
  @Get()
  async getAll() {
    return 'tracks'
  }

  @Post()
  create() {
    return 'create'
  }
}
