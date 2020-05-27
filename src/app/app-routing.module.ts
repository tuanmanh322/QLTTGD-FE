import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './shared/layouts/main/main.component';
import {MainClientComponent} from './shared/client-layouts/main-client/main-client.component';


const routes: Routes = [
  {
    path: 'admin',
    component: MainComponent,
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
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'hoi-dap',
        loadChildren: () => import('./modules/hoi-dap/hoi-dap.module').then(m => m.HoiDapModule)
      }
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
