import { Injectable } from '@nestjs/common';

import { User } from '@app/entities/User';
import { Company } from '@app/entities/company';

interface Request {
  user: User;
  company: Company;
}

type Response = void;

@Injectable()
export class WelcomeCreate {
  constructor();

  async execute(request: Request): Promise<Response> {}
}
