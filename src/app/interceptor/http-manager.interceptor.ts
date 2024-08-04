import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CookieManagerService } from '../cookie/cookie-manager.service';

export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {
  
  let cookieManagerService : CookieManagerService= inject(CookieManagerService);

  if(cookieManagerService.isExists()){
    const token : string = cookieManagerService.get();
    req.clone({
      headers:req.headers.set('Authorization', token)
    });
  }

  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      return throwError(()=>error)
    })
  )
};
