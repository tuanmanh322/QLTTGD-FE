import {Order} from './order';

export interface BaseSearch {
  totalRecords?: number;
  page: number;
  totalPages?: number;
  pageSize?: number;
  orders?: Order[];
  data?: any[];
}
