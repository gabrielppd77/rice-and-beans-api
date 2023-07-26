import { Entity } from '@core/entities/entity';

export interface CategoryProps {
  name: string;
  photoUrl?: string;
  categoryParentId?: string;
}

export class Category extends Entity<CategoryProps> {
  public get name() {
    return this.props.name;
  }

  public get photoUrl() {
    return this.props.photoUrl;
  }

  public get categoryParentId() {
    return this.props.categoryParentId;
  }
}
