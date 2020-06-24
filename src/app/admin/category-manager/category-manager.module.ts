import {NgModule} from '@angular/core';
import {CategoryCreateComponent} from './category-create/category-create.component';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {categoryRoutes} from './category-manager.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule } from 'src/app/shared/paginator/paginator.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [CategoryCreateComponent, CategoryListComponent, CategoryDetailsComponent, CategoryEditComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule,
    PaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoryListComponent
      }
    ])
  ],
    providers: [],
    entryComponents: [CategoryCreateComponent]
})
export class CategoryManagerModule {
}
