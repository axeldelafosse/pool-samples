import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailerService } from './mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
