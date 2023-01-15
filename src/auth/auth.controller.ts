import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Enforcer } from 'casbin';

import { SignupDto } from './signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('PERMISSION_ENFORCER') private readonly enforcer: Enforcer,
  ) {}

  @Post('signin')
  signin() {
    return 'signin';
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    await this.enforcer.addRoleForUserInDomain(
      '3a4a479e-50e9-4161-9162-1e42bb313d2f', // user id
      'admin', // role
      '34d242c6-4c23-4d79-b9aa-d13d3081f290', // tenant id
    );
    return 'signup';
  }
}
