import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

export interface CategoryProps {
  companyId: UniqueEntityID;
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
