import { Company } from '@domain/entities/company';

import { ConsumerRepository } from '@domain/repositories/consumer.repository';

export class InMemoryConsumerRepository extends ConsumerRepository {
  public companies: Company[] = [];

  async getCompanyByUrlAccess(urlAccess: string): Promise<Company | null> {
    const company = this.companies.find((d) => d.urlAccess === urlAccess);
    if (!company) return null;
    return company;
  }
}
