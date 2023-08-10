import { HttpException, HttpStatus } from '@nestjs/common';

export class RegisterNotFoundException extends HttpException {
  constructor() {
    super('Registro não encontrado', HttpStatus.BAD_REQUEST);
  }
}
