import { Magic, MAGIC_MIME_TYPE } from 'mmmagic';
import { Injectable } from '@nestjs/common';

import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
  RemoveEvent,
  DeepPartial,
  TransactionManager,
  EntityManager,
} from 'typeorm';

import { registerEntitySubscriber } from 'lib/typeorm/subscribe';
import { LazyTransaction } from 'lib/typeorm/lazy_transaction';

import { S3Service } from 'src/modules/s3/s3.service';
import { File } from 'src/entities/file.entity';
import { FileDAO } from 'src/entities/dao/file.dao';

interface AttachOrReplaceInput {
  resourceId: string;
  resourceType: string;
  file: { buffer: Buffer; name: string; mimeType?: string };
}

@Injectable()
@EventSubscriber()
export class FileService implements EntitySubscriberInterface<File> {
  public constructor(
    private readonly connection: Connection,
    private readonly s3Service: S3Service,
  ) {
    registerEntitySubscriber(this.connection, this);
  }

  public listenTo() {
    return File;
  }

  public afterRemove(event: RemoveEvent<File>) {
    const file = event.entity || event.databaseEntity;
    if (file && file.s3key) this.s3Service.delete(file.s3key);
  }

  @LazyTransaction()
  public async replace(
    input: AttachOrReplaceInput,
    @TransactionManager() manager: EntityManager | null,
  ) {
    // Delete existing file with same reference
    await manager.getCustomRepository(FileDAO).delete({
      resourceId: input.resourceId,
      resourceType: input.resourceType,
      reference: input.file.name,
    });

    // Attach new file
    return this.attach(input, manager);
  }

  @LazyTransaction()
  public async attach(
    input: AttachOrReplaceInput,
    @TransactionManager() manager: EntityManager | null,
  ) {
    const { resourceId, resourceType, file: fileInput } = input;
    const fileDAO = manager.getCustomRepository(FileDAO);

    const computedMimeType = await this.computeMimeType(
      fileInput.buffer,
      fileInput.mimeType,
    );

    const { id } = await fileDAO.save<DeepPartial<File>>({
      resourceId,
      resourceType,
      reference: fileInput.name,
      storage: 's3',
      contentLength: String(fileInput.buffer.length),
      contentType: computedMimeType,
    });

    // We need to reload with File entity to get the url computed properly
    const file = await fileDAO.findOne(id);
    await this.s3Service.upload(file.s3key, fileInput.buffer, {
      ACL: 'public-read',
    });

    return file;
  }

  private computeMimeType(buffer: Buffer, mimeType?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (mimeType) return resolve(mimeType);

      const magic = new Magic(MAGIC_MIME_TYPE);
      return magic.detect(buffer, (err, result) =>
        err ? reject(err) : resolve(result),
      );
    });
  }
}
