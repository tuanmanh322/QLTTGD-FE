import {LopEnti} from './lop-enti';
import {NhatkiEnti} from './nhatki-enti';

export interface UserCheckinModel {
  idThe?: number;

  maThe?: number;

  userName?: string;

  lopList?: LopEnti[];

  nhatcheckins?: NhatkiEnti[];

  imagePath?: string;
}
