import {BaseSearch} from './base-search';

export interface LopHocSearch extends BaseSearch {
  tenLop?: string;
  endDate?: Date;
  startDate?: Date;
  username?: string;
  active?: number;
}
