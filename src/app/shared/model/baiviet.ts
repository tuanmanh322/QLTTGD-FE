import {CommentModel} from './comment.model';

export interface Baiviet {
  id?: number;
  maComment?: string;
  noiDung?: string;
  luotThich?: number;
  loutKhongthich?: number;
  idBaiViet?: number;
  idUser?: number;
  userName?: string;
  commentDTOS?: CommentModel[];
}
