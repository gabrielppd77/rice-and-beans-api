import { Injectable } from '@nestjs/common';

import { Client } from '@domain/entities/client';

@Injectable()
export abstract class ClientRepository {
  abstract getByPhoneNumber(phoneNumber: string): Promise<Client | null>;
}
