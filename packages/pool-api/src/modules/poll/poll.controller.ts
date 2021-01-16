import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PollService } from './poll.service';

@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post('upload-picture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPollPicture(@Body() body, @UploadedFile() file) {
    return await this.pollService.setPicture(body.pollId, file);
  }
}
