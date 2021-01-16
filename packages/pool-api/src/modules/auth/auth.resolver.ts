import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { SessionObject } from './login-user.dto';
import { SuccessObjectDto } from 'src/success-object.dto';

@Resolver()
export class AuthResolver {
  public constructor(private readonly authService: AuthService) {}

  @Mutation(_returns => SessionObject, { name: 'nest_loginUser' })
  public async loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const token = await this.authService.logIn({ email, password });
    return { type: 'bearer', token };
  }

  @Mutation(_returns => SuccessObjectDto, {
    name: 'nest_askResetUserPassword',
  })
  public async askResetUserPassword(@Args('email') email: string) {
    await this.authService.generateLostPasswordToken(email);
    return { success: true, message: 'EMAIL_SENT' };
  }

  @Mutation(_returns => SuccessObjectDto, {
    name: 'nest_resetUserPassword',
  })
  public async resetUserPassword(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('token') token: string,
  ) {
    await this.authService.updateUserPasswordWithToken({
      email,
      password,
      token,
    });
    return { success: true, message: 'PASSWORD_UPDATED' };
  }
}
