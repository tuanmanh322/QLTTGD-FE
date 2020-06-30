import {NgModule} from '@angular/core';
import {PipeTime} from './pipe.time';
import {CommonModule} from '@angular/common';
import {PipeDateTime} from './pipe-date-time';


@NgModule({
  declarations: [PipeTime, PipeDateTime],
  exports: [PipeTime , PipeDateTime],
  imports: [
    CommonModule
  ]
})
export class PipeModule {

}
