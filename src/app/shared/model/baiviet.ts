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
  chuDe?: string;
  idCD?: number;
  userName?: string;
  imageAvatar?: string;
  totalComment?: string;
  createDate?: Date;
  dateMili?: number;
  imageBV?: string;
  commentDTOS?: CommentModel[];
  idThe?: number;
  viewCounts?: number;
  titleBV?: string;
  contentBV?: string;
}
