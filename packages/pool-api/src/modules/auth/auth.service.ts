import moment from 'moment';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from 'src/modules/user/user.service';
import { MailerService } from 'src/modules/mailer/mailer.service';

import { SignupUserDto } from './signup-user.dto';
import { LoginUserDto } from './login-user.dto';
import { CheckUserDto } from './check-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  async signUp(body: SignupUserDto): Promise<string> {
    const hashedPassword = await hash(body.password, 10);

    const user = await this.userService.create({
      email: body.email,
      password: hashedPassword,
      firstName: body.firstName,
      lastName: body.lastName,
      locale: body.locale,
    });

    const payload: JwtPayload = {
      id: user.id,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user', 'anonymous'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.id,
      },
    };

    return this.jwtService.sign(payload);
  }

  async logIn(body: LoginUserDto): Promise<string> {
    const user = await this.userService.findOne({
      where: { email: body.email },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: `No user found for email: ${body.email}`,
        },
        401,
      );
    }

    const passwordValid = await compare(body.password, user.password);
    if (!passwordValid) {
      throw new HttpException(
        { status: HttpStatus.UNAUTHORIZED, error: 'Invalid password' },
        401,
      );
    }

    const payload: JwtPayload = {
      id: user.id,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user', 'anonymous'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.id,
      },
    };

    return this.jwtService.sign(payload);
  }

  async check(param: CheckUserDto): Promise<string> {
    const user = await this.userService.findOne({
      where: { email: param.email },
    });

    if (!user) {
      return 'not_signed_up';
    }

    return 'signed_up';
  }

  validateUser(payload: JwtPayload) {
    return this.userService.findOne({ where: { id: payload.id } });
  }

  public async generateLostPasswordToken(email: string) {
    const user = await this.userService.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new HttpException('EMAIL_NOT_FOUND', HttpStatus.UNAUTHORIZED);
    }

    const tokenString = `${email}-${moment().format('DD/MM/YYYY')}`;
    const encrypted = Buffer.from(await hash(tokenString, 10)).toString(
      'base64',
    );

    await this.mailerService.lostPassword(email, encrypted);
  }

  public async updateUserPasswordWithToken(
    body: LoginUserDto & { token: string },
  ) {
    const email = body.email;
    const uncryptedToken = `${email}-${moment().format('DD/MM/YYYY')}`;
    const match = await compare(
      uncryptedToken,
      Buffer.from(body.token, 'base64').toString('ascii'),
    );

    if (!match) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userService.findOne({
      where: { email: email },
    });
    const hashedPassword = await hash(body.password, 10);

    await this.userService.setPassword(user.id, hashedPassword);
  }
}
