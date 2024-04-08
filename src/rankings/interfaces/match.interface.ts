import { Document } from 'mongoose';

export interface Match extends Document {
  category: string;
  challenge: string;
  players: string[];
  winner: string;
  result: Array<Result>;
}

interface Result {
  set: string;
}
