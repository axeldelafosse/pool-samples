import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { S3Module } from 'src/modules/s3/s3.module';
import { FileDAO } from 'src/entities/dao/file.dao';

import { FileService } from './file.service';
import { FileUploadResolver } from './file-upload.resolver';
import { FileController } from './file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FileDAO]), S3Module],
  providers: [FileService, FileUploadResolver],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}
