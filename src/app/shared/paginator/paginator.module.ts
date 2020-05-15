import {NgModule} from '@angular/core';
import {PaginatorComponent} from './paginator.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule
  ],
  exports: [PaginatorComponent]
})
export class PaginatorModule {

}
