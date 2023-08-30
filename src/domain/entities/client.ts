import { Entity } from '@core/entities/entity';
import { Bill } from './bill';

interface ClientProps {
  name: string;
  phoneNumber: string;

  bills?: Bill[];
}

export class Client extends Entity<ClientProps> {}
