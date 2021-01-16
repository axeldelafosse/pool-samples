import { Test, TestingModule } from '@nestjs/testing';
import { PollResolver } from './poll.resolver';

describe('PollResolver', () => {
  let resolver: PollResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PollResolver],
    }).compile();

    resolver = module.get<PollResolver>(PollResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
