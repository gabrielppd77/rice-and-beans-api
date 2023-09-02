import { Injectable } from '@nestjs/common';

import { Company } from '@domain/entities/company';

import { ConsumerRepository } from '@domain/repositories/consumer.repository';

import { RegisterNotFoundException } from '@domain/exceptions/register-not-found.exception';

interface Request {
  urlAccess: string;
}

interface Response {
  company: Company;
}

@Injectable()
export class ConsumerCompanyGetByUrl {
  constructor(private consumerRepository: ConsumerRepository) {}

  async execute(req: Request): Promise<Response> {
    const { urlAccess } = req;
    const company = await this.consumerRepository.getCompanyByUrlAccess(
      urlAccess,
    );
    if (!company) throw new RegisterNotFoundException();
    return { company };
  }
}
