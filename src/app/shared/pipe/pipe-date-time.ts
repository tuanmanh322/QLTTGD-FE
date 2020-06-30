import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatDateTime'
})
export class PipeDateTime implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    console.log(new Date(value));
    return new Date(value);
  }
}

