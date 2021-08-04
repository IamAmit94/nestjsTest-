import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/module/auth/user.entity';

export const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});

// we do not use the decorator for the new version of nestJs as the data is retrieve from req file
