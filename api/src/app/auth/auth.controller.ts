import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // any request starts with /auth should be handled by this controller
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login') // if post request, call this fn
  async login(@Body() body: any) {
    return this.authService.validateUser(body.email, body.password);

  }

}
