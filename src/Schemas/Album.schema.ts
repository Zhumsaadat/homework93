import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
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

    @Prop({
        ref: typeof Artist,
        required: true,
        validate: {
            validator:  async function(id: Types.ObjectId) {
                const artist = await this.model('Artist').findById(id);
                return Boolean(artist);
            },
            message: 'Artist does not exists!!!',
        },
    })

    singer: mongoose.Schema.Types.ObjectId;
}


export const AlbumSchema = SchemaFactory.createForClass(Album);