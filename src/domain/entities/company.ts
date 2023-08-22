import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { User } from './user';
import { Category } from './category';

function generateUrlAccessByName(name: string): string {
  name = name.toLowerCase();
  name = name.replaceAll(' ', '-');
  return name;
}

export interface CompanyProps {
  userId: UniqueEntityID;
  name: string;
  phone?: string;
  description?: string;
  urlAccess?: string;

  user?: User;
  categories?: Category[];
}

export class Company extends Entity<CompanyProps> {
  constructor(companyProps: CompanyProps, id?: string) {
    const urlAccess = companyProps.urlAccess
      ? companyProps.urlAccess
      : generateUrlAccessByName(companyProps.name);
    super({ ...companyProps, urlAccess }, id);
  }

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
  get urlAccess() {
    return this.props.urlAccess;
  }
  get user() {
    return this.props.user;
  }
  get categories() {
    return this.props.categories;
  }
}
