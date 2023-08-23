import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppCompanyDTO } from './dtos/app-company.dto';

import { AppCompanyGetByUrl } from '@domain/use-cases/app/app-company-get-by-url';
import { Public } from '@infra/http/decorators/public.decorator';

@Public()
@ApiTags('app')
@Controller('app')
export class AppController {
  constructor(private appCompanyGetByUrl: AppCompanyGetByUrl) {}

  @Get('/company/:urlAccess')
  async getById(@Param('urlAccess') urlAccess: string): Promise<AppCompanyDTO> {
    const { company } = await this.appCompanyGetByUrl.execute({ urlAccess });
    return new AppCompanyDTO(company);
  }
}
