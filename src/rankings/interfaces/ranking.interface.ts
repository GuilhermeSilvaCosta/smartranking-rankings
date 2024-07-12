import { Document } from 'mongoose';

export enum EventEnum {
  VICTORY = 'VICTORY',
  DEFEAT = 'DEFEAT',
}

export interface Ranking extends Document {
  challenge: string;
  match: string;
  category: string;
  player: string;
  event: EventEnum;
  operation: string;
  score: number;
}
