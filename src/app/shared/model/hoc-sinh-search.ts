import {BaseSearch} from './base-search';

export interface HocSinhSearch extends BaseSearch {
    tenLop?: string;
    tenHS?: string;
    ngaySinh?: Date;
    gioiTinh?: string;
  }