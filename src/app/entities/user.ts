import { Entity } from '@app/common/entities/entity';

interface UserProps {
  id?: string;
  email: string;
  name: string;
  password: string;
  phone: string;
}

export class User extends Entity {
  email: string;
  name: string;
  password: string;
  phone: string;

  constructor(props: UserProps) {
    super(props.id);
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
    this.phone = props.phone;
  }
}
