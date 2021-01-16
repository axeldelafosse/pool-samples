import { EntityRepository, Repository } from 'typeorm';
import { UsersPoll } from '../users_poll.entity';

@EntityRepository(UsersPoll)
export class UsersPollDAO extends Repository<UsersPoll> {}
