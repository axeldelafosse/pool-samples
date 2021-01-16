import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ConfigService } from 'src/modules/config/config.service';
import { validateAuthSecretKey } from 'lib/bypass-jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private appKey: string;

  public constructor(private readonly configService: ConfigService) {
    super();
    this.appKey = configService.get('JWT_SECRET_KEY');
  }

  public canActivate(context: ExecutionContext) {
    return validateAuthSecretKey(context) || super.canActivate(context);
  }

  public handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
