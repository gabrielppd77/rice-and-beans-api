import { InMemoryConsumerRepository } from '@test/repositories/in-memory-consumer.repository';
import { ConsumerCompanyGetByUrl } from './consumer-company-get-by-url';

import { RegisterNotFoundException } from '@domain/exceptions/register-not-found.exception';
import { Company } from '@domain/entities/company';

import { UniqueEntityID } from '@core/entities/unique-entity-id';

describe('ConsumerCompanyGetByUrl', () => {
  it('should be show error when not found a register', async () => {
    const productRepository = new InMemoryConsumerRepository();
    const consumerCompanyGetByUrl = new ConsumerCompanyGetByUrl(
      productRepository,
    );

    await expect(
      async () =>
        await consumerCompanyGetByUrl.execute({
          urlAccess: 'url-invalid',
        }),
    ).rejects.toThrow(RegisterNotFoundException);
  });

  it('shoud be find a company correctly', async () => {
    const productRepository = new InMemoryConsumerRepository();
    const consumerCompanyGetByUrl = new ConsumerCompanyGetByUrl(
      productRepository,
    );

    const companyToCreate = new Company({
      name: 'Company Truth Name',
      userId: new UniqueEntityID(),
      urlAccess: 'company-truth-name',
    });

    productRepository.companies.push(companyToCreate);

    const { company } = await consumerCompanyGetByUrl.execute({
      urlAccess: companyToCreate.urlAccess,
    });

    expect(company.id.toValue()).toEqual(companyToCreate.id.toValue());
    expect(company.name).toEqual(companyToCreate.name);
    expect(company.userId.toValue()).toEqual(companyToCreate.userId.toValue());
    expect(company.urlAccess).toEqual(companyToCreate.urlAccess);
  });
});
