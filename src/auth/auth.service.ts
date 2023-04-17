import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(authDto: AuthDto) {
    const hash = await argon.hash(authDto.password);
    const user = await this.prisma.user.create({
      data: {
        username: authDto.username,
        hash_password: hash,
      },
      select: {
        id: true,
        username: true,
      },
    });

    return user;
  }
}
