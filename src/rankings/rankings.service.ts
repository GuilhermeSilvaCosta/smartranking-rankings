import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EventEnum, Ranking } from './interfaces/ranking.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Match } from './interfaces/match.interface';

@Injectable()
export class RankingsService {
  constructor(
    @InjectModel('Ranking') private readonly rankingModel: Model<Ranking>,
  ) {}

  async processMatch(match: Match): Promise<void> {
    match.players.forEach((player) => {
      const event =
        match.winner == player ? EventEnum.VICTORY : EventEnum.DEFEAT;
      const operation = event == EventEnum.VICTORY ? '+' : '-';
      const points = event == EventEnum.VICTORY ? 30 : 0;

      const ranking = {
        challenge: match.challenge,
        match: match.id,
        category: match.category,
        player: player,
        event,
        operation,
        points,
      } as Ranking;

      this.rankingModel.create(ranking);
    });
  }
}
