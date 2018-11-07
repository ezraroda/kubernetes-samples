import { Entity, model, property } from '@loopback/repository';

@model()
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}
