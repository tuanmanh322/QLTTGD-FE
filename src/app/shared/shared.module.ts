import {ModuleWithProviders, NgModule} from '@angular/core';
import {ApiService} from './service/api.service';
import {LayoutsModule} from './layouts/layouts.module';
import {PaginatorModule} from './paginator/paginator.module';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    PaginatorModule,
    NgbAccordionModule
  ],
  exports: [LayoutsModule],
  providers: [
    ApiService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return { ngModule: SharedModule };
  }
}
