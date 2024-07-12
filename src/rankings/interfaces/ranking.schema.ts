import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventEnum } from './ranking.interface';

@Schema({ timestamps: true, collection: 'rankings' })
class Ranking {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  challenge: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  match: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  player: string;

  @Prop({ enum: [EventEnum.VICTORY, EventEnum.DEFEAT] })
  event: string;

  @Prop()
  operation: string;

  @Prop()
  score: number;
}

export const RankingSchema = SchemaFactory.createForClass(Ranking);
