import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { s3 } from 'src/config';

@Entity({ name: 'files' })
@ObjectType()
export class File {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: true })
  public reference: string;

  @Column({
    name: 'content_type',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public contentType: string;

  @Column({
    name: 'content_length',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public contentLength: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public storage: string;

  @Column({
    name: 'resource_type',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public resourceType: string;

  @Column({
    name: 'resource_id',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public resourceId: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @Field((_type) => String)
  public get url() {
    return encodeURI(`${s3.bucketURL}/${this.s3key}`);
  }

  public get s3key() {
    const fileName = `${this.id}-${this.reference}-original`;
    const [, fileExt] = this.contentType.split('/');

    return `${this.resourceType}/${this.resourceId}/${fileName}.${fileExt}`;
  }
}
