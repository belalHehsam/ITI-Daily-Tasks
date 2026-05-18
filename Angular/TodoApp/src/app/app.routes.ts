import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Components/layout/layout.routes').then((m) => m.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./Components/auth/auth.routes').then((m) => m.routes),
  },

  {
    path: '**',
    loadComponent: () => import('./Components/not-found/not-found').then((m) => m.NotFound),
  },
];
