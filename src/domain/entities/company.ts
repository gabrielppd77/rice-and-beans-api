import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

export interface CompanyProps {
  userId: UniqueEntityID;
  name: string;
  phone?: string;
  description?: string;
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
}
