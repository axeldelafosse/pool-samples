import S3FS from 's3fs';
import { Injectable } from '@nestjs/common';

import { ConfigService } from 'src/modules/config/config.service';

@Injectable()
export class S3Service {
  public client: S3FS;

  public constructor(private readonly configService: ConfigService) {
    this.client = new S3FS(configService.get('S3_BUCKET'), {
      accessKeyId: configService.get('S3_KEY'),
      secretAccessKey: configService.get('S3_SECRET'),
      region: configService.get('S3_REGION'),
      signatureVersion: 'v4',
    });
  }

  public async download(path: string) {
    const fileData = await this.client.readFile(path);
    return fileData.Body;
  }

  public async upload(path: string, buffer: Buffer, options = {}) {
    await this.client.writeFile(path, buffer, options);
    return `https://${this.configService.get(
      'S3_BUCKET',
    )}.s3.${this.configService.get('S3_REGION')}.amazonaws.com/${path.replace(
      /\s/g,
      '+',
    )}`;
  }

  public async delete(path: string) {
    await this.client.delete(path);
  }
}
