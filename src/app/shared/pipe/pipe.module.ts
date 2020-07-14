import {NgModule} from '@angular/core';
import {PipeTime} from './pipe.time';
import {CommonModule} from '@angular/common';
import {PipeDateTime} from './pipe-date-time';
import {FormatLocalDateTime} from './format-local-date-time';


@NgModule({
  declarations: [PipeTime, PipeDateTime, FormatLocalDateTime],
  exports: [PipeTime , PipeDateTime , FormatLocalDateTime],
  imports: [
    CommonModule
  ]
})
export class PipeModule {

}
