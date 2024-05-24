import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksController } from './tracks/tracks.controller';

@Module({
  imports: [],
  controllers: [AppController, TracksController],
  providers: [AppService],
})
export class AppModule {}
