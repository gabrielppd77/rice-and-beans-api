import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { OrderItem } from './order-item';
import { Bill } from './bill';

interface OrderProps {
  billId: UniqueEntityID;
  total: number;

  bill?: Bill;
  items?: OrderItem[];
}

export class Order extends Entity<OrderProps> {}
