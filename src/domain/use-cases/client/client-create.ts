import { Injectable } from '@nestjs/common';

interface Request {
  name: string;
  phoneNumber: string;
}

type Response = void;

@Injectable()
export class ClientCreate {
  async execute(req: Request): Promise<Response> {}
}
