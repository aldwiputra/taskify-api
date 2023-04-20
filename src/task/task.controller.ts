import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedReq } from 'src/user/user.controller';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TaskController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getAllTasks(@Req() req: AuthenticatedReq) {
    const user = this.prisma.task.findMany();

    return user;
  }
}
