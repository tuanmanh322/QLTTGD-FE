import {CommentModel} from './comment.model';

export interface Baiviet {
  id?: number;
  mabaiviet?: string;
  maComment?: string;
  title?: string;
  noidung?: string;
  luotthich?: number;
  luotkhongthich?: number;
  idBaiViet?: number;
  idUser?: number;
  userName?: string;
  imageAvatar?: string;
  totalComment?: string;
  createDate?: Date;
  dateMili?: number;
  commentDTOS?: CommentModel[];
}
