import {NgModule} from '@angular/core';
import {PointsListComponent} from './points-list/points-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginatorModule} from '../../shared/paginator/paginator.module';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: PointsListComponent
      }
    ])
  ],
  declarations: [PointsListComponent]
})
export class PointsManagerModule {

}
