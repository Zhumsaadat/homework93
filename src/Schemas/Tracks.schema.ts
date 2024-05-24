import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
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

  @Prop({ref: typeof Album, required: true})
  album: mongoose.Schema.Types.ObjectId;
}


export const TracksSchema = SchemaFactory.createForClass(Tracks);