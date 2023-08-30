import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Product } from './product';
import { Order } from './order';

interface OrderItemProps {
  orderId: UniqueEntityID;
  productId: UniqueEntityID;

  observation?: string;
  quantity: number;
  total: number;

  order?: Order;
  product?: Product;
}

export class OrderItem extends Entity<OrderItemProps> {}
