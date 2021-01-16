import { IsEmail, IsNotEmpty } from 'class-validator';
import { ObjectType, Field } from '@nestjs/graphql';

export class LoginUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

@ObjectType()
export class SessionObject {
  @Field((_type) => String) public type: string;
  @Field((_type) => String) public token: string;
}
