import {BaseSearch} from './base-search';

export interface BaivietManagerSearch extends BaseSearch{
  titleBV?: string;
  noidung?: string;
  active?: number;
  tenChuDe?: string;
}
