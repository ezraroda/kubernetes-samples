import {inject} from '@loopback/core';
import {juggler, AnyObject} from '@loopback/repository';
const config = require('./customer.datasource.json');

export class CustomerDataSource extends juggler.DataSource {
  static dataSourceName = 'Customer';

  constructor(
    @inject('datasources.config.Customer', {optional: true})
    dsConfig: AnyObject = config,
  ) {
    super(dsConfig);
  }
}
