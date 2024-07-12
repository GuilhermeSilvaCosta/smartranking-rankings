import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { parse, endOfDay } from 'date-fns';
import { EventEnum, Ranking } from './interfaces/ranking.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Match } from './interfaces/match.interface';
import { RankingResponse } from './interfaces/ranking-response.interface';

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
      const score = event == EventEnum.VICTORY ? 30 : 0;

      const ranking = {
        challenge: match.challenge,
        match: match.id,
        category: match.category,
        player: player,
        event,
        operation,
        score,
      } as Ranking;

      this.rankingModel.create(ranking);
    });
  }

  async list(
    categoryId: string,
    reference?: string,
  ): Promise<RankingResponse[]> {
    const dateReference = reference
      ? parse(reference, 'yyyy-MM-dd', new Date())
      : new Date();

    const rankingCategory = await this.rankingModel.find({
      category: categoryId,
      createdAt: { $lte: endOfDay(dateReference) },
    });

    const result: RankingResponse[] = rankingCategory.reduce((result, item) => {
      let add = true;
      result.forEach((rankingItem) => {
        if (rankingItem.player === item.player.toString()) {
          add = false;

          rankingItem.score += item.score;
          if (item.event == EventEnum.VICTORY)
            rankingItem.matchHistory.victories += 1;

          if (item.event == EventEnum.DEFEAT)
            rankingItem.matchHistory.defeats += 1;
        }
      });

      if (add) {
        result.push({
          player: item.player.toString(),
          score: item.score,
          matchHistory: {
            victories: item.event == EventEnum.VICTORY ? 1 : 0,
            defeats: item.event == EventEnum.DEFEAT ? 1 : 0,
          },
        } as RankingResponse);
      }

      return result
        .sort((a, b) => {
          if (a.score > b.score) return -1;
          if (a.score < b.score) return 1;

          return 0;
        })
        .map((item, index) => ({
          ...item,
          position: index + 1,
        }));
    }, []);

    return result;
  }
}
