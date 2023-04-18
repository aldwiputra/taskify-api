import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(authDto: AuthDto) {
    const hash = await argon.hash(authDto.password);

    try {
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
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential taken');
        }
        throw error;
      }
    }
  }

  async signIn(authDto: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: authDto.username,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const isPassMatch = await argon.verify(
      user.hash_password,
      authDto.password,
    );

    if (!isPassMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }

    delete user.hash_password;
    return user;
  }
}
