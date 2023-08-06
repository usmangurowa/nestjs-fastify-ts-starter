import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//  create custom decorator to get user from request object
export const GetUser = createParamDecorator(
  (data: unknown | string | undefined, ctx: ExecutionContext) => {
    // get request object from context
    const request = ctx.switchToHttp().getRequest();
    // if data is provided and it is a string, return user property from request.user
    if (data && typeof data === 'string') {
      // return user property from request.user
      return request.user[data];
    }
    // otherwise, return user object from request.user
    return request.user;
  },
);
