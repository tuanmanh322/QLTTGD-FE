import {Time} from '@angular/common';

export interface HocBa {
  id?: number;
  maLop?: string;
  tenLop?: string;
  tenMonHoc?: string;
  ngayKhaiGiang?: Date;
  ngayKetThuc?: Date;
  siSo?: number;
  kipDay?: string;
  diaDiem?: string;
  hocPhi?: string;
  thu?: string;
  gioBatDau?: Time;
  gioKetThuc?: Time;
}
