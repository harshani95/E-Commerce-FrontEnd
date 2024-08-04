import { CanActivateFn, Router } from '@angular/router';
import { CookieManagerService } from '../cookie/cookie-manager.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let cookieManagerService = inject(CookieManagerService);
  let router = inject(Router);

  if (cookieManagerService.isExists()) {
    router.navigateByUrl('/dashboard');
    return false;
  }
  return true;
};
