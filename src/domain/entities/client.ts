import { Entity } from '@core/entities/entity';
import { Bill } from './bill';

interface ClientProps {
  phoneNumber: string;
  bills?: Bill[];
}

export class Client extends Entity<ClientProps> {}
