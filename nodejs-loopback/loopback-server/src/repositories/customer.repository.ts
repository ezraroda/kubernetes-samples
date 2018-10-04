import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Customer} from '../models';
import {CustomerDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id
> {
  constructor(
    @inject('datasources.Customer') dataSource: CustomerDataSource,
  ) {
    super(Customer, dataSource);
  }
}
