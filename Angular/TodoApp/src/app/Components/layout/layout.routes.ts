import { Routes } from '@angular/router';
import { confirmLeaveGuard } from '../../../utils/guards/confirmLeaveGuard';
import { authGuard } from '../../../utils/guards/auth-guard';
import { guestGuard } from '../../../utils/guards/guestGuard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('../carsoul/carsoul').then((m) => m.Carsoul),
      },
      {
        path: 'list',
        canMatch: [authGuard],
        loadComponent: () => import('../TaskList/TaskList').then((m) => m.TaskList),
      },

      {
        path: 'add',
        canMatch: [authGuard],
        canDeactivate: [confirmLeaveGuard],
        loadComponent: () => import('../form/form').then((m) => m.Form),
      },
    ],
  },
];
