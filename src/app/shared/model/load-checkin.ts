import {NhatCheckinEnti} from './nhat-checkin-enti';

export interface LoadCheckin {
  userName?: string;

  maThe?: string;

  idRole?: number;

  nhatcheckins?: NhatCheckinEnti[];
}
