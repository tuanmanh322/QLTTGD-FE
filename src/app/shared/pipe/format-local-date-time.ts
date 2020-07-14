import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'formatLocalDateTime'
})
export class FormatLocalDateTime implements PipeTransform {
  transform(args: any[]): any {
    let year = '';
    let month = '';
    let days = '';
    let hour = '';
    let min = '';
    let sec = '';

    if (args[0].toString().length === 4) {
      year = args[0];
    }

    if (args[1].toString().length === 1) {
      month = '0' + args[1];
    } else {
      month = args[1];
    }
    if (args[2].toString().length === 1) {
      days = '0' + args[2];
    } else {
      days = args[2];
    }
    if (args[3].toString().length === 1) {
      hour = '0' + args[1];
    } else {
      hour = args[3];
    }
    if (args[4].toString().length === 1) {
      min = '0' + args[1];
    } else {
      min = args[4];
    }
    if (args[5].toString().length === 1) {
      sec = '0' + args[1];
    } else {
      sec = args[5];
    }
    const dateF = year + '-' + month + '-' + days + ' ' + hour + ':' + min + ':' + sec;
    return dateF.toString();
  }
}
