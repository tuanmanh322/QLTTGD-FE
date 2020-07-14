import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FacebookShareComponent } from './facebook-share/facebook-share.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FacebookShareComponent
  ],
  declarations: [FacebookShareComponent]
})
export class SocialSharingModule {

}
