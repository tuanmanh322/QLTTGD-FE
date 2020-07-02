import {NgModule} from '@angular/core';
import {CategoryCreateComponent} from './category-create/category-create.component';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {categoryRoutes} from './category-manager.routing';
import {PaginatorModule} from '../../shared/paginator/paginator.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CategoryCreateComponent, CategoryListComponent, CategoryDetailsComponent, CategoryEditComponent],
  imports: [
    categoryRoutes,
    PaginatorModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: []
})
export class CategoryManagerModule {
}
