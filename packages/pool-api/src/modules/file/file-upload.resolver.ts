import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { GraphQLUpload } from 'apollo-server';

import { GqlUser } from 'lib/decorators';
import { processFileInput, FileInput } from 'lib/process-file-input';

import { GqlUserJwtAuthGuard } from 'src/guards/gql-user-jwt-auth.guard';
import { SuccessObjectDto } from 'src/success-object.dto';

import { FileDAO } from 'src/entities/dao/file.dao';
import { File } from 'src/entities/file.entity';
import { User } from 'src/entities/user.entity';

import { FileService } from './file.service';

@Resolver()
export class FileUploadResolver {
  public constructor(
    private readonly fileService: FileService,
    private readonly fileDAO: FileDAO,
  ) {}

  @Mutation(() => SuccessObjectDto, { name: 'nest_deleteFile' })
  @UseGuards(GqlUserJwtAuthGuard)
  public async removeFile(
    @Args({ name: 'fileId', type: () => String }) fileId: string,
    @GqlUser() currentUser: User,
  ) {
    await this.fileDAO.delete({ id: fileId });

    return { success: true };
  }

  @Mutation(() => File, { name: 'nest_uploadFile' })
  @UseGuards(GqlUserJwtAuthGuard)
  public async uploadFile(
    @Args({ name: 'resourceType', type: () => String }) resourceType: string,
    @Args({ name: 'resourceId', type: () => String }) resourceId: string,
    @Args({ name: 'file', type: () => GraphQLUpload }) fileInput: FileInput,
    @GqlUser() currentUser: User,
  ) {
    const file = await processFileInput(fileInput);
    const fileEntity = await this.fileService.attach(
      {
        resourceId,
        resourceType,
        file: { buffer: file.buffer, name: file.fileName },
      },
      null,
    );

    await file.unlink();

    return fileEntity;
  }
}
