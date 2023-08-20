import { randomUUID } from 'crypto';

export class UniqueEntityID {
  private value: string;

  toValue() {
    return this.value;
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }
}
