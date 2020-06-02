import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'formatTime'
})

export class PipeTime implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const time = (new Date().getTime() - value)+ 24300000;
    let timeType = '';
    let timeAgo = 0;
    if (time) {
      if (time >= 31536000000) {
        timeType = 'năm trước';
        timeAgo = Math.round(time / 31536000000);
      } else if (time >= 2592000000) {
        timeType = 'tháng trước';
        timeAgo = Math.round(time / 2592000000);
      } else if (time >= 604800000) {
        timeType = 'tuần trước';
        timeAgo = Math.round(time / 604800000);
      } else if (time >= 86400000) {
        timeType = 'ngày trước';
        timeAgo = Math.round(time / 86400000);
      } else if (time >= 3600000) {
        timeType = 'giờ trước';
        timeAgo = Math.round(time / 3600000);
      } else if (time >= 60000) {
        timeType = 'phút trước';
        timeAgo = Math.round(time / 60000);
      } else {
        timeType = 'vừa xong';
        timeAgo = 0;
      }
      return `${timeAgo === 0 ? '' : timeAgo} ${timeType}`;
    } else {
      return 0;
    }
  }
}
