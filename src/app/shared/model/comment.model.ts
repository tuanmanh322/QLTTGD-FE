import {RepCommentModel} from './rep-comment.model';

export interface CommentModel {
  id?: number;
  maComment?: string;
  noiDung?: string;
  luotThich?: number;
  loutKhongthich?: number;
  idBaiViet?: number;
  idUser?: number;
  userName?: string;
  imageAvatarCM?: string;
  commentDate?: Date;
  repCommentDTOS?: RepCommentModel[];
}
