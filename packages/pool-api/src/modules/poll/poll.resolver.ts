import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server';
import { Field, ArgsType } from '@nestjs/graphql';

import { FileInput, processFileInput } from 'lib/process-file-input';

import { Poll } from 'src/entities/poll.entity';
import { PollService } from 'src/modules/poll/poll.service';
import { FileService } from 'src/modules/file/file.service';

import { SuccessObjectDto } from 'src/success-object.dto';

@ArgsType()
class JoinPrivatePollInput {
  @Field(() => String)
  public code: string;

  @Field(() => String)
  public userId: string;

  @Field(() => String, { nullable: true })
  public pollId?: string;
}

@Resolver((_of) => Poll)
export class PollResolver {
  public constructor(
    private readonly pollService: PollService,
    private readonly fileService: FileService,
  ) {}

  @Query((_returns) => Poll, { name: 'nest_getPollName' })
  public async getPollName(
    @Args({ name: 'id', type: () => String }) id: string,
    @Args({ name: 'code', type: () => String }) code: string,
  ) {
    const poll = await this.pollService.findPollById(id);

    if (code !== poll.code) {
      return { id: '', name: '', type: '' };
    }

    return { id: poll.id, name: poll.name, type: poll.type };
  }

  @Mutation((_returns) => SuccessObjectDto, { name: 'nest_joinPrivatePoll' })
  public async joinPrivatePoll(
    @Args()
    { code, userId, pollId }: JoinPrivatePollInput,
  ) {
    let poll: Poll;
    if (pollId) {
      poll = await this.pollService.findPollById(pollId);
      if (code !== poll.code) {
        return { success: false, message: 'WRONG_CODE' };
      }
    } else {
      poll = await this.pollService.findPollByCode(code);
      if (!poll) {
        return { success: false, message: 'POOL_NOT_FOUND' };
      }
    }

    await this.pollService.addUserToPoll(userId, poll.id);
    return { success: true, message: 'POOL_JOINED' };
  }

  @Mutation((_returns) => SuccessObjectDto, {
    name: 'nest_uploadPollPicture',
  })
  public async uploadPollPicture(
    @Args({ name: 'pollId', type: () => String }) pollId: string,
    @Args({ name: 'file', type: () => GraphQLUpload }) fileInput: FileInput,
  ) {
    const file = await processFileInput(fileInput);
    const fileEntity = await this.fileService.attach(
      {
        resourceId: pollId,
        resourceType: 'pool_picture',
        file: { buffer: file.buffer, name: file.fileName },
      },
      null,
    );

    await file.unlink();

    await this.pollService.setPicture(pollId, fileEntity.url);

    return { success: true, message: 'POOL_PICTURE_UPLOADED' };
  }
}
