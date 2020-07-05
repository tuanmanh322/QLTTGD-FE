import {BaseSearch} from './base-search';

export interface BaivietSearchTotal extends BaseSearch {
  titleBV?: string;
  idChuDe?: number;
  startDate?: Date;
  endDate?: Date;
  noidungBV?: string;
}
