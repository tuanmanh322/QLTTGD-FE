import {Time} from '@angular/common';

export interface LopHocModel {
  id?: number;
  maLop?: string;
  tenLop?: string;
  tenlop?: string;
  tenMonHoc?: string;
  ngayKhaiGiang?: Date;
  ngayKetThuc?: Date;
  siSo?: number;
  diaDiem?: string;
  hocPhi?: string;
  kipDay?: string;
  thu?: string;
  gioBatDau?: Time;
  gioKetThuc?: Time;
  diemMieng?: number;
  diem15p?: number;
  diem90p?: number;
  diemTB?: number;
  countSiSo?: number;
  idDiem?: number;
  maMonHoc?: number;
}
