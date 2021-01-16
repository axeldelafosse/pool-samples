import { Injectable } from '@nestjs/common';
import { GqlUserJwtAuthGuard } from './gql-user-jwt-auth.guard';

@Injectable()
export class GqlOptionalUserJwtAuthGuard extends GqlUserJwtAuthGuard {
  public handleRequest(_err, user: any) {
    return user;
  }
}
