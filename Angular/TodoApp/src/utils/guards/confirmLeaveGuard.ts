import { CanDeactivateFn } from '@angular/router';

export const confirmLeaveGuard: CanDeactivateFn<any> = () => {
  return confirm('Are you sure you want to leave?');
};
