import { Injectable } from '@nestjs/common';
import { User } from '@domain/entities/user';
import { Company } from '@domain/entities/company';

@Injectable()
export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User, company: Company): Promise<void>;
}
