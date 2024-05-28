import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../Schemas/Artist.schema';
import { Model } from 'mongoose';
import { CreateArtistDto } from './create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PermitGuard } from '../permit-auth/permit-auth.guard';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';

@Controller('artists')
export class ArtistsController {
    constructor(
        @InjectModel(Artist.name)
        private artistModel: Model<ArtistDocument>,
    ) {}

    @Get()
    async getAll() {
        return this.artistModel.find();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.artistModel.findById({_id: id});
    }

    @UseGuards(TokenAuthGuard, new PermitGuard('admin', 'user'))
    @Post()
    @UseInterceptors(
        FileInterceptor('image', {dest: './public/image/artists'}),
    )
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() artistDto: CreateArtistDto) {
        const artist = new this.artistModel({
            name: artistDto.name,
            image: file ? '/image/artists/' + file.filename : null,
            info: artistDto.info,
            isPublished: false,
        });

        return await artist.save();
    }

    @UseGuards(TokenAuthGuard, new PermitGuard('admin'))
    @Delete(':id')
    async deleteById (@Param('id') id: string) {
        console.log(id)
        const result = await this.artistModel.findByIdAndDelete({_id: id});
        return { message: 'Artist deleted successfully', result };
}

}
