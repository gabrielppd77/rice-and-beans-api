import { Entity } from '@core/entities/entity';

interface CompanyProps {
  name: string;
  phone?: string;
  description?: string;
}

export class Company extends Entity<CompanyProps> {
  get name() {
    return this.name;
  }
  get phone() {
    return this.phone;
  }
  get description() {
    return this.description;
  }
}
