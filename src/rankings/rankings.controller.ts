import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Match } from './interfaces/match.interface';
import { RankingsService } from './rankings.service';
import { RankingResponse } from './interfaces/ranking-response.interface';

@Controller('rankings')
export class RankingsController {
  private readonly logger = new Logger(RankingsController.name);

  constructor(private readonly rankgingsService: RankingsService) {}

  @EventPattern('process-match')
  processMatch(@Payload() match: Match) {
    this.logger.log(`match: ${JSON.stringify(match)}`);
    this.rankgingsService.processMatch(match);
  }

  @MessagePattern('list-rankings')
  listRanking(
    @Payload() { categoryId, reference },
  ): Promise<RankingResponse[]> {
    return this.rankgingsService.list(categoryId, reference);
  }
}
