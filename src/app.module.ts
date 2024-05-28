import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksController } from './tracks/tracks.controller';
import { Artist, ArtistSchema } from './Schemas/Artist.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './Schemas/Album.schema';
import { Tracks, TracksSchema } from './Schemas/Tracks.schema';
import { CategoriesController } from './categories/categories.controller';
import { AlbumsController } from './albums/albums.controller';
import { ArtistsController } from './artists/artists.controller';
import { UsersController } from './users/users.controller';
import { User, UserSchema } from './Schemas/User.shema';

@Module({
  imports: [
     MongooseModule.forRoot('mongodb://localhost/spotify'),
     MongooseModule.forFeature([
       { name: Artist.name, schema: ArtistSchema },
       { name: Album.name, schema: AlbumSchema },
       { name: Tracks.name, schema: TracksSchema },
       { name: User.name, schema: UserSchema },
     ])

  ],
  controllers: [AppController, TracksController, CategoriesController, AlbumsController, ArtistsController, UsersController],
  providers: [AppService],
})
export class AppModule {}
