import { Injectable } from '@nestjs/common';

import { Company } from '@domain/entities/company';

import { AppRepository } from '@domain/repositories/app.repository';

import { RegisterNotFoundException } from '@domain/exceptions/register-not-found.exception';

interface Request {
  urlAccess: string;
}

interface Response {
  company: Company;
}

@Injectable()
export class AppCompanyGetByUrl {
  constructor(private appRepository: AppRepository) {}

  async execute(req: Request): Promise<Response> {
    const { urlAccess } = req;
    const company = await this.appRepository.getCompanyByUrlAccess(urlAccess);
    if (!company) throw new RegisterNotFoundException();
    return { company };
  }
}
