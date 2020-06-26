import {BaseSearch} from './base-search';

export interface UserSearch extends BaseSearch{
  userName?: string;
  idRole?: string;
  active?: string;
}
