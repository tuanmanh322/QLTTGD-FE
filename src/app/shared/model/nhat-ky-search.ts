import {BaseSearch} from './base-search';

export interface NhatKySearch extends BaseSearch{
  tuNgay?: Date;
  denNgay?: Date;
  tenLop?: string;
  idRole?: number;
}
