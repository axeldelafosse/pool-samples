import { EntityRepository, Repository } from 'typeorm';
import { LinksPoll } from '../links_poll.entity';

@EntityRepository(LinksPoll)
export class LinksPollDAO extends Repository<LinksPoll> {}
