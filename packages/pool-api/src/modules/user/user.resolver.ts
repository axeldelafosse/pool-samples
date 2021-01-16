import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server';

import { GqlUser } from 'lib/decorators';
import { FileInput, processFileInput } from 'lib/process-file-input';

import { SuccessObjectDto } from 'src/success-object.dto';
import { GqlUserJwtAuthGuard } from 'src/guards/gql-user-jwt-auth.guard';

import { UserService } from './user.service';
import { FileService } from 'src/modules/file/file.service';

import { User } from 'src/entities/user.entity';

@Resolver((_of) => User)
export class UserResolver {
  public constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  @Mutation((_returns) => SuccessObjectDto, {
    name: 'nest_userUploadProfilePicture',
  })
  @UseGuards(GqlUserJwtAuthGuard)
  public async userUploadProfilePicture(
    @GqlUser() currentUser: User,
    @Args({ name: 'file', type: () => GraphQLUpload }) fileInput: FileInput,
  ) {
    const file = await processFileInput(fileInput);
    const fileEntity = await this.fileService.attach(
      {
        resourceId: currentUser.id,
        resourceType: 'profile_picture',
        file: { buffer: file.buffer, name: file.fileName },
      },
      null,
    );

    await file.unlink();

    await this.userService.setPicture(currentUser.id, fileEntity.url);

    return { success: true, message: 'PROFILE_PICTURE_UPLOADED' };
  }
}
