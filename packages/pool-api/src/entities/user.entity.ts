import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity('users')
@ObjectType()
export class User {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  public email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public password: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: true })
  public firstName: string | null;

  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: true })
  public lastName: string | null;

  @Column({ name: 'picture', type: 'varchar', length: 255, nullable: true })
  public picture: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public color: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public username: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public locale: string | null;

  @Column({ name: 'created_at', type: 'timestamptz', nullable: true })
  public createdAt: Date | string | null;

  @Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt: Date | string | null;
}
