import { Injectable } from '@nestjs/common';

import { Company } from '@domain/entities/company';

@Injectable()
export abstract class ConsumerRepository {
  abstract getCompanyByUrlAccess(urlAccess: string): Promise<Company | null>;
}
