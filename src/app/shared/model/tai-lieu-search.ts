import {BaseSearch} from './base-search';

export interface TaiLieuSearch extends BaseSearch{
  startDate?: Date;

  title?: string;

  endDate?: Date;
}
