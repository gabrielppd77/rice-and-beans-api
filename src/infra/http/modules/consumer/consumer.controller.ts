import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ConsumerCompanyDTO } from './dtos/consumer-company.dto';

import { ConsumerCompanyGetByUrl } from '@domain/use-cases/consumer/consumer-company-get-by-url';
import { Public } from '@infra/http/decorators/public.decorator';

@Public()
@ApiTags('consumer')
@Controller('consumer')
export class ConsumerController {
  constructor(private consumerCompanyGetByUrl: ConsumerCompanyGetByUrl) {}

  @Get('/company/:urlAccess')
  async getById(
    @Param('urlAccess') urlAccess: string,
  ): Promise<ConsumerCompanyDTO> {
    const { company } = await this.consumerCompanyGetByUrl.execute({
      urlAccess,
    });
    return new ConsumerCompanyDTO(company);
  }
}
