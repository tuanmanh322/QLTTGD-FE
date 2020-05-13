import {NgModule} from '@angular/core';
import {CategoryCreateComponent} from './category-create/category-create.component';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {categoryRoutes} from './category-manager.routing';


@NgModule({
  declarations: [CategoryCreateComponent, CategoryListComponent, CategoryDetailsComponent, CategoryEditComponent],
  imports: [
    categoryRoutes
  ],
  providers: []
})
export class CategoryManagerModule {
}
