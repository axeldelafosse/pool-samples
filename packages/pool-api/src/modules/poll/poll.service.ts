import { Injectable } from '@nestjs/common';

import { PollDAO } from 'src/entities/dao/poll.dao';
import { Poll } from 'src/entities/poll.entity';
import { UsersPollDAO } from 'src/entities/dao/users_poll.dao';

@Injectable()
export class PollService {
  constructor(
    private readonly pollDAO: PollDAO,
    private readonly usersPollDAO: UsersPollDAO,
  ) {}

  public async findOne(options?: any): Promise<Poll> {
    return await this.pollDAO.findOne({ ...options });
  }

  public async findPollById(id: string): Promise<Poll> {
    return await this.pollDAO
      .createQueryBuilder('poll')
      .leftJoinAndSelect('poll.links', 'link')
      .where('poll.id = :id', { id })
      .orderBy('link.created_at', 'ASC')
      .getOne();
  }

  public async findPollByCode(code: string): Promise<Poll> {
    return await this.pollDAO
      .createQueryBuilder('poll')
      .where('poll.code = :code', { code })
      .getOne();
  }

  public async addUserToPoll(userId: string, pollId: string) {
    return await this.usersPollDAO.save({
      userId,
      pollId,
    });
  }

  public async setPicture(pollId: string, pictureUrl: string) {
    await this.pollDAO.update(pollId, { picture: pictureUrl });
  }
}
