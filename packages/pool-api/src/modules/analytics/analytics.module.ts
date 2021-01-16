import { Module } from '@nestjs/common';

import { AnalyticsService } from './analytics.service';

@Module({
  imports: [],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
