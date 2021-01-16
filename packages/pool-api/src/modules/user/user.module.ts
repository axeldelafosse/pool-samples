import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserDAO } from 'src/entities/dao/user.dao';

import { S3Module } from 'src/modules/s3/s3.module';
import { FileModule } from 'src/modules/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserDAO]), S3Module, FileModule],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
