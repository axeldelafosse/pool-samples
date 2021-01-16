import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Min, Max } from 'class-validator';

@Entity('links')
@ObjectType()
export class Link {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: false })
  public url: string;

  @Field((_type) => ID)
  @Column({ name: 'posted_by', type: 'uuid' })
  public postedBy: string;

  @Field()
  @Column({ name: 'created_at', type: 'timestamptz', nullable: true })
  public createdAt: Date;

  @Field()
  @Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  public name: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  public title: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  public description: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  public image: string;

  @Field()
  @Column({ type: 'bool', default: false })
  public hidden: boolean;

  @Field((type) => Int, { defaultValue: 0 })
  @Min(0)
  public skip: number;

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  public take = 25;

  // Helpers
  public startIndex = this.skip;
  public endIndex = this.skip + this.take;
}

// TODO: downvotes
// TODO: upvotes
// TODO: comments
