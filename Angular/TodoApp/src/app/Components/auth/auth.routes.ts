import { Routes } from '@angular/router';
import { guestGuard } from '../../../utils/guards/guestGuard';
import { authGuard } from '../../../utils/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth').then((m) => m.Auth),
    children: [
      {
        path: 'login',
        canMatch: [guestGuard],
        loadComponent: () => import('../login/login').then((m) => m.Login),
      },
      {
        path: 'signUp',
        loadComponent: () => import('../sign-up/sign-up').then((m) => m.SignUp),
      },
    ],
  },
];
