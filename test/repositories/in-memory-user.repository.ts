import { Company } from '@domain/entities/company';
import { User } from '@domain/entities/user';

import { UserRepository } from '@domain/repositories/user.repository';

export class InMemoryUserRepository extends UserRepository {
  public users: User[] = [];
  public companies: Company[] = [];
  async create(user: User, company: Company): Promise<void> {
    this.users.push(user);
    this.companies.push(company);
  }
  async findByEmail(email: string): Promise<User | null> {
    const userFinded = this.users.find((user) => user.email === email);
    return userFinded || null;
  }
}
