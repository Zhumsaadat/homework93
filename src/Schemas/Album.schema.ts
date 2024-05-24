import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Artist } from './Artist.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @Prop({ required: true })
    name: string;

    @Prop({required: true})
    date: number;

    @Prop()
    image: string;

    @Prop()
    isPublished: boolean;

    @Prop({ref: typeof Artist, required: true})
    singer: mongoose.Schema.Types.ObjectId;
}


export const AlbumSchema = SchemaFactory.createForClass(Album);