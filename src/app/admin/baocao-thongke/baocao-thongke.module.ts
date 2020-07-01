import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import { ReportManagerComponent } from './report-manager/report-manager.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ReportManagerComponent],
  imports: [
    ChartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReportManagerComponent
      }
    ])
  ]
})
export class BaocaoThongkeModule {

}
