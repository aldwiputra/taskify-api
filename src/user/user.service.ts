import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUsers(): { name: string } {
    return {
      name: 'Hello this is userssssssss',
    };
  }
}
