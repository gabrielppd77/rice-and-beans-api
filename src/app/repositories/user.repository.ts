import { Injectable } from '@nestjs/common';
import { User } from '@app/entities/user';

@Injectable()
export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
}
