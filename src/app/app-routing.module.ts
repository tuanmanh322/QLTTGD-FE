import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './shared/layouts/main/main.component';
import {MainClientComponent} from './shared/client-layouts/main-client/main-client.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {GuardsGuard} from './shared/guard/guard.guard';


const routes: Routes = [
  {
    path: 'admin',
    component: MainComponent,
    canActivate: [GuardsGuard],
    children: [
      {
        path: 'qlttgd',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: '',
    component: MainClientComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'hoi-dap',
        loadChildren: () => import('./modules/hoi-dap/hoi-dap.module').then(m => m.HoiDapModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile-emp/profile-emp.module').then(m => m.ProfileEmpModule)
      },
      {
        path: 'document',
        loadChildren: () => import('./modules/child-modules/child-modules.module').then(m => m.ChildModulesModule)
      },
    ]

  },
  {
    path: 'auth',
    component: MainClientComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
