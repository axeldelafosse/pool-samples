import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { PollResolver } from './poll.resolver';
import { PollDAO } from 'src/entities/dao/poll.dao';
import { UsersPollDAO } from 'src/entities/dao/users_poll.dao';

import { S3Module } from 'src/modules/s3/s3.module';
import { FileModule } from 'src/modules/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PollDAO, UsersPollDAO]),
    S3Module,
    FileModule,
  ],
  controllers: [PollController],
  providers: [PollService, PollResolver],
  exports: [PollService],
})
export class PollModule {}
