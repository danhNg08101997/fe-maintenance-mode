import {CanActivateFn, Router} from '@angular/router';
import {AuthStore} from './auth.store';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const store = inject(AuthStore);
  const router = inject(Router);

  if (!store.isLoggedIn()) return router.parseUrl('/login');
  return true;
};
