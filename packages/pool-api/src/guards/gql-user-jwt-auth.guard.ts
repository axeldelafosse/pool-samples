import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

import { validateAuthSecretKey } from 'lib/bypass-jwt';

@Injectable()
export class GqlUserJwtAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext) {
    return validateAuthSecretKey(context) || super.canActivate(context);
  }

  // this is used by `AuthGuard.canActivate` parent class
  // in order to get the right http request context from GraphQL request
  public getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req;
  }
}
