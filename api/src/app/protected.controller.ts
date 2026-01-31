import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/roles.enum';

@Controller('protected')
export class ProtectedController {

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  @Get('owner-only')
  ownerOnly(@Req() req: any) {
    return {
      message: 'Only OWNER can see this',
      user: req.user,
    };
  }
}
