import { Entity } from '@core/entities/entity';
import { Company } from './company';

export interface UserProps {
  email: string;
  name: string;
  password: string;
  phone: string;

  company?: Company;
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }
  get name() {
    return this.props.name;
  }
  get password() {
    return this.props.password;
  }
  get phone() {
    return this.props.phone;
  }
  get company() {
    return this.props.company;
  }
  set company(company: Company) {
    this.props.company = company;
  }
}
