import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksController } from './tracks/tracks.controller';
import { Artist, ArtistSchema } from './Schemas/Artist.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './Schemas/Album.schema';
import { Tracks, TracksSchema } from './Schemas/Tracks.schema';

@Module({
  imports: [
     MongooseModule.forRoot('mongodb://localhost/spotify'),
     MongooseModule.forFeature([
       { name: Artist.name, schema: ArtistSchema },
       { name: Album.name, schema: AlbumSchema },
       { name: Tracks.name, schema: TracksSchema },
     ])

  ],
  controllers: [AppController, TracksController],
  providers: [AppService],
})
export class AppModule {}
