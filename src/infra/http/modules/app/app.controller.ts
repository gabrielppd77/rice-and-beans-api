import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller('app')
export class AppController {
  // constructor() {}
}
