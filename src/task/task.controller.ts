import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedReq } from 'src/user/user.controller';
import { AuthGuard } from '@nestjs/passport';
import { CreateTask } from './dto/createTask.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TaskController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getAllTasks(@Req() req: AuthenticatedReq) {
    const user = this.prisma.task.findMany({
      where: {
        id: req.user.id,
      },
    });

    return user;
  }

  @Post()
  createTask(@Body() dto: CreateTask) {
    const user = this.prisma.task.create({
      data: {
        title: dto.title,
        done: dto.done,
        userId: dto.userId,
      },
    });

    return user;
  }
}
