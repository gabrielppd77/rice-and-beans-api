import { Company, CompanyProps } from '@domain/entities/company';

export function makeCompany(override?: Partial<CompanyProps>) {
  const company = new Company({
    name: 'COMPANY LTA',
    description: 'Company of company',
    phone: '42877776666',
    userId: '12345',
    ...override,
  });

  return company;
}
