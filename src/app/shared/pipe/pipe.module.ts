import {NgModule} from '@angular/core';
import {PipeTime} from './pipe.time';
import {CommonModule} from '@angular/common';
import {FormatLocalDateTime} from './format-local-date-time';


@NgModule({
  declarations: [PipeTime, FormatLocalDateTime],
  exports: [PipeTime  , FormatLocalDateTime],
  imports: [
    CommonModule
  ]
})
export class PipeModule {

}
