import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity('links_polls')
@ObjectType()
export class LinksPoll {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field((_type) => ID)
  @Column({ name: 'link_id', type: 'uuid' })
  public linkId: string;

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
