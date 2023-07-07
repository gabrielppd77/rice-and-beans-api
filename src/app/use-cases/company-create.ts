import { Injectable } from '@nestjs/common';

import { Company } from '@app/entities/company';

interface Request {
  name: string;
  phone?: string;
  description?: string;
}

type Response = Company;

@Injectable()
export class CompanyCreate {
  execute(req: Request): Response {
    const { name, phone, description } = req;

    return new Company({
      name,
      phone,
      description,
    });
  }
}
