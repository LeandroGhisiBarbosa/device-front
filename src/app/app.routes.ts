import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'app',
    loadComponent: () => import('./components/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'devices',
        pathMatch: 'full'
      },
      {
        path: 'devices',
        loadComponent: () => import('./components/devices/device-list/device-list.component').then(m => m.DeviceListComponent)
      },
      {
        path: 'devices/new',
        loadComponent: () => import('./components/devices/device-form/device-form.component').then(m => m.DeviceFormComponent)
      },
      {
        path: 'devices/edit/:id',
        loadComponent: () => import('./components/devices/device-form/device-form.component').then(m => m.DeviceFormComponent)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
