import { Entity } from '@core/entities/entity';

export interface CompanyProps {
  userId: string;
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
