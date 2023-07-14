import { Entity } from '@core/entities/entity';

interface UserProps {
  email: string;
  name: string;
  password: string;
  phone: string;
}

export class User extends Entity<UserProps> {
  get email() {
    return this.email;
  }
  get name() {
    return this.name;
  }
  get password() {
    return this.password;
  }
  get phone() {
    return this.phone;
  }
}
