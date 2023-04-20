import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

export interface AuthenticatedReq extends Request {
  user: User;
}

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getUser(@Req() req: AuthenticatedReq) {
    return this.userService.getUser(req.user);
  }
}
