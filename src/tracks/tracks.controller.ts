import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tracks, TracksDocument } from '../Schemas/Tracks.schema';
import { CreateTrackDto } from './create-tracks.dto';

@Controller('tracks')
export class TracksController {
  constructor(
      @InjectModel(Tracks.name)
      private tracksModel: Model<TracksDocument>,
  ) {
  }

  @Get()
  async findByTrack(@Query('album') albumId: string) {
    return await this.tracksModel.find({album: albumId});
  }


  @Post()
  async create(@Body() trackDto: CreateTrackDto) {
    const artist = new this.tracksModel({
      name: trackDto.name,
      duration: trackDto.duration,
      sequence: trackDto.sequence,
      album: trackDto.album,
      isPublished: false
    });

    return await artist.save();
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const result = await this.tracksModel.findByIdAndDelete({_id: id});
    return {message: 'Track deleted successfully', result};
  }
}
