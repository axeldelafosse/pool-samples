import { IsEmail } from 'class-validator';

export class CheckUserDto {
  @IsEmail()
  readonly email: string;
}
