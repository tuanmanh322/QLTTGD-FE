import {ModuleWithProviders, NgModule} from '@angular/core';
import {ApiService} from './service/api.service';
import {LayoutsModule} from './layouts/layouts.module';


@NgModule({
  declarations: [],
  imports: [],
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
