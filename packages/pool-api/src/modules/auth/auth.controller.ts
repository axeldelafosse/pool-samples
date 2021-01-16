import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignupUserDto } from './signup-user.dto';
import { LoginUserDto } from './login-user.dto';
import { CheckUserDto } from './check-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupUserDto: SignupUserDto): Promise<string> {
    return await this.authService.signUp(signupUserDto);
  }

  @Post('login')
  async logIn(@Body() loginUserDto: LoginUserDto): Promise<string> {
    return await this.authService.logIn(loginUserDto);
  }

  @Post('check')
  async checkIfUserIsSignedUp(
    @Body() checkUserDto: CheckUserDto,
  ): Promise<string> {
    return await this.authService.check(checkUserDto);
  }
}
