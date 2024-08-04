import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {

  constructor(private cookieService: CookieService) { }
  
  public set(token:string){
    this.cookieService.set('token', token, 90);
  }

  public isExists():boolean{
    return this.cookieService.check('token');
  }

  public get():string{
    return this.cookieService.get('token');
  }

}
