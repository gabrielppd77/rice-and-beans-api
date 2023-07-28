import { Entity } from '@core/entities/entity';

export interface CategoryProps {
  companyId: string;
  name: string;
  photoUrl?: string;
}

export class Category extends Entity<CategoryProps> {
  public get companyId() {
    return this.props.companyId;
  }
  public get name() {
    return this.props.name;
  }
  public get photoUrl() {
    return this.props.photoUrl;
  }
}
