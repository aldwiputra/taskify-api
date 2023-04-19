import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser(): { name: string } {
    return {
      name: 'Hello this is user',
    };
  }
}
