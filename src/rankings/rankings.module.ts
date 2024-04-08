import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { RankingsService } from './rankings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RankingSchema } from './interfaces/ranking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ranking', schema: RankingSchema }]),
  ],
  controllers: [RankingsController],
  providers: [RankingsService],
})
export class RankingsModule {}
