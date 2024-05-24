import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from '../Schemas/Album.schema';
import { CreateAlbumDto } from './create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('albums')
export class AlbumsController {
    constructor(
        @InjectModel(Album.name)
        private albumModel: Model<AlbumDocument>,
    ) {}

    @Get()
    async findByArtist(@Query('singer') singerId: string){
        return await this.albumModel.find({singer: singerId});
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.albumModel.findById({_id: id});
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {dest: './public/image/albums'}),
    )
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() albumDto: CreateAlbumDto) {
        const artist = new this.albumModel({
            name: albumDto.name,
            image: file ? '/image/albums/' + file.filename : null,
            date: albumDto.date,
            singer: albumDto.singer,
            isPublished: false
        });

        return await artist.save();
    }

    @Delete(':id')
    async deleteById (@Param('id') id: string) {
        const result = await this.albumModel.findByIdAndDelete({_id: id});
        return { message: 'Album deleted successfully', result };
    }
}
