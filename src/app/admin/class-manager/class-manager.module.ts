import {NgModule} from '@angular/core';
import {ClassCreateComponent} from './class-create/class-create.component';
import {ClassListComponent} from './class-list/class-list.component';
import {ClassDetailComponent} from './class-detail/class-detail.component';
import {ClassEditComponent} from './class-edit/class-edit.component';
import {classRoutes} from './class-manager.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ClassCreateComponent, ClassListComponent, ClassDetailComponent, ClassEditComponent],
  imports: [
    classRoutes,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  providers: [],
  entryComponents: [ClassCreateComponent]
})
export class ClassManagerModule {
}
