import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Album } from './Album.schema';

export type TracksDocument = Tracks & Document;

@Schema()
export class Tracks {
  @Prop({ required: true })
  name: string;

  @Prop({required: true})
  duration: string;

  @Prop()
  sequence: number;


  @Prop()
  isPublished: boolean;

  @Prop({
    ref: typeof Album,
    required: true,
    validate: {
      validator:  async function(id: Types.ObjectId) {
        const album = await this.model('Album').findById(id);
        return Boolean(album);
      },
      message: 'Album does not exists!!!',
    },
  })
  album: mongoose.Schema.Types.ObjectId;
}


export const TracksSchema = SchemaFactory.createForClass(Tracks);