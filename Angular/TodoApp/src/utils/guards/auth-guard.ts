import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const email = localStorage.getItem('email');
  if (email) return true;
  else {
    alert('you must login First');
    return router.createUrlTree(['auth/login']);
  }
};
