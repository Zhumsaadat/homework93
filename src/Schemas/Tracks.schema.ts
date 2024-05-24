import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AlbumsDocument = Album & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({required: true})
  duration: string;

  @Prop()
  sequence: number;


  @Prop()
  isPublished: boolean;

  @Prop({ref: typeof Album, required: true})
  category: mongoose.Schema.Types.ObjectId;
}


export const CategorySchema = SchemaFactory.createForClass(Category);