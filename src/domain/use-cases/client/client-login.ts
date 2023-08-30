import { Injectable } from '@nestjs/common';

import { RegisterNotFoundException } from '@domain/exceptions/register-not-found.exception';

import { ClientRepository } from '@domain/repositories/client.repository';

interface Request {
  phoneNumber: string;
}

// interface Response {
//   access_token: string;
// }
type Response = void;

@Injectable()
export class ClientLogin {
  constructor(private clientRepository: ClientRepository) {}
  async execute(req: Request): Promise<Response> {
    const { phoneNumber } = req;
    const client = await this.clientRepository.getByPhoneNumber(phoneNumber);
    if (!client) throw new RegisterNotFoundException();
  }
}
