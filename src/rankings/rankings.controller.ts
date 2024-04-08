import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Match } from './interfaces/match.interface';
import { RankingsService } from './rankings.service';

@Controller('rankings')
export class RankingsController {
  private readonly logger = new Logger(RankingsController.name);

  constructor(private readonly rankgingsService: RankingsService) {}

  @EventPattern('process-match')
  processMatch(@Payload() match: Match) {
    console.log(`match: ${JSON.stringify(match)}`);
    this.rankgingsService.processMatch(match);
  }
}
