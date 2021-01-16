import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity('users_polls')
@ObjectType()
export class UsersPoll {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field((_type) => ID)
  @Column({ name: 'user_id', type: 'uuid' })
  public userId: string;

  @Field((_type) => ID)
  @Column({ name: 'poll_id', type: 'uuid' })
  public pollId: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}
