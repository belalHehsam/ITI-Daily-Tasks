import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const guestGuard: CanMatchFn = () => {
  const router = inject(Router);
  const email = localStorage.getItem('email');

  if (!email) {
    return true;
  } else {
    confirm('You Already logged in');
    return router.createUrlTree(['/home']);
  }
};
