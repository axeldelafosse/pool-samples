import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { S3Service } from 'src/modules/s3/s3.service';
import { FileDAO } from 'src/entities/dao/file.dao';

@Controller('files')
export class FileController {
  public constructor(
    private readonly fileDAO: FileDAO,
    private readonly s3Service: S3Service,
  ) {}

  @Get(':id.*')
  public async fetchFile(@Res() res: Response, @Param('id') id: number) {
    const file = await this.fileDAO.findOneOrFail(id);

    const buffer = await this.s3Service.download(file.s3key);

    res.set({
      'Content-Disposition': 'inline',
      'Content-Type': file.contentType,
    });

    return res.send(buffer);
  }
}
