import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserService} from '../service/user.service';

@Directive({
  selector: '[appHasAnyAuthority]'
})
export class HasAnyAuthorityDirective {
  private authorities: string[];

  constructor(
    private userService: UserService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  @Input()
  set appHasAnyAuthority(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [value] : value;
    this.updateView();
    // Get notified each time authentication state changes.
    this.userService.getAuthState().subscribe(identity => this.updateView());
  }

  private updateView(): void {
    const  hasAnyAuthority = this.userService.hasAnyAuthority(this.authorities);
    this.viewContainerRef.clear();
    if (hasAnyAuthority){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
