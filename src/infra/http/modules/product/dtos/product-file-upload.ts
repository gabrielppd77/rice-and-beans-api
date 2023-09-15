import { ApiProperty } from '@nestjs/swagger';

export class ProductFileUploadDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
