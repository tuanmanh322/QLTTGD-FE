import {NgModule} from '@angular/core';
import {adminRoutes} from './admin.routing';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    adminRoutes,
    CommonModule
  ],
  exports: [],
  providers: []
})
export class AdminModule {
}
