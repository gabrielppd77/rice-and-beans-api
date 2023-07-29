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
    if (!userFinded) return null;
    const companyFinded = this.companies.find(
      (company) => company.userId.toValue() === userFinded.id.toValue(),
    );
    if (companyFinded) userFinded.company = companyFinded;
    return userFinded;
  }
}
