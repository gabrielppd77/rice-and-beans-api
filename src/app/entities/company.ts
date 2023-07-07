import { Entity } from '@app/common/entities/entity';

interface CompanyProps {
  id?: string;
  name: string;
  phone?: string;
  description?: string;
}

export class Company extends Entity {
  name: string;
  phone: string;
  description: string;

  constructor(props: CompanyProps) {
    super(props.id);
    this.name = props.name;
    this.phone = props.phone;
    this.description = props.description;
  }
}
