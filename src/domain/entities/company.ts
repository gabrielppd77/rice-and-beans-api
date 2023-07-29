import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { User } from './user';
import { Category } from './category';

export interface CompanyProps {
  userId: UniqueEntityID;
  name: string;
  phone?: string;
  description?: string;

  user?: User;
  categories?: Category[];
}

export class Company extends Entity<CompanyProps> {
  get userId() {
    return this.props.userId;
  }
  get name() {
    return this.props.name;
  }
  get phone() {
    return this.props.phone;
  }
  get description() {
    return this.props.description;
  }
  get user() {
    return this.props.user;
  }
  get categories() {
    return this.props.categories;
  }
}
