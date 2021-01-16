import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

import { Link } from './link.entity';

@Entity('polls')
@ObjectType()
export class Poll {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: false })
  public name: string;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public description: string;

  @Field()
  @Column({ name: 'picture', type: 'varchar', length: 255, nullable: true })
  public picture: string | null;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @Field((_type) => ID)
  @Column({ name: 'created_by', type: 'uuid' })
  public createdBy: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  public type: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  public code: string;

  @ManyToMany(() => Link)
  @JoinTable({
    name: 'links_polls',
    joinColumn: { name: 'poll_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'link_id', referencedColumnName: 'id' },
  })
  public links: Link[];
}
