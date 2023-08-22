import { Company } from '@domain/entities/company';

import { AppRepository } from '@domain/repositories/app.repository';

export class InMemoryAppRepository extends AppRepository {
  public companies: Company[] = [];

  async getCompanyByUrlAccess(urlAccess: string): Promise<Company | null> {
    const company = this.companies.find((d) => d.urlAccess === urlAccess);
    if (!company) return null;
    return company;
  }
}
