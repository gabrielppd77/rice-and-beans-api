import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Client } from './client';
import { Order } from './order';

interface BillProps {
  clientId: UniqueEntityID;

  total: number;

  client?: Client;
  orders?: Order[];
}

export class Bill extends Entity<BillProps> {}
