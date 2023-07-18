import { Entity } from '@core/entities/entity';

export interface UserProps {
  email: string;
  name: string;
  password: string;
  phone: string;
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
}
