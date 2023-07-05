import { randomUUID } from 'crypto';

export class Entity {
  id: string;
  constructor(id?: string) {
    this.id = id ?? randomUUID();
  }
}
