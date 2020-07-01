import {BaseSearch} from './base-search';

export interface ContactSearch extends BaseSearch{
  username?: string;
  email?: string;
  sdt?: string;
}
