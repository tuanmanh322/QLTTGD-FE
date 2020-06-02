import {NgModule} from '@angular/core';
import {PipeTime} from './pipe.time';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [PipeTime],
  exports: [PipeTime],
  imports: [
    CommonModule
  ]
})
export class PipeModule {
  
}
