import { EntityRepository, Repository } from 'typeorm';
import { Poll } from '../poll.entity';

@EntityRepository(Poll)
export class PollDAO extends Repository<Poll> {}
