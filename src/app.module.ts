import { Module } from '@nestjs/common';
import { RankingsModule } from './rankings/rankings.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/sr-rankings?authSource=sr-rankings',
    ),
    RankingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
