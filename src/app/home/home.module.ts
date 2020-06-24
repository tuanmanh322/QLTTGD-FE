import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {ClientLayoutsModule} from '../shared/client-layouts/client-layouts.module';
import {RouterModule} from '@angular/router';
import {PaginatorModule} from '../shared/paginator/paginator.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ClientLayoutsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        loadChildren: () => import('./topic/topic.module').then(m => m.TopicModule)
      }
    ]),
    PaginatorModule,
    FormsModule
  ],
  exports: [HomeComponent]
})
export class HomeModule {

}
