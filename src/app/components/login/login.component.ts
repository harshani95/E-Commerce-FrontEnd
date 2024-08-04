import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { CookieManagerService } from '../../cookie/cookie-manager.service';
import { HttpResponse } from '@angular/common/http';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router,
     private cookieManagerService: CookieManagerService) { 
  }

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  login() {
    let obj = {
      username: this.form.value?.username,
      password: this.form.value?.password,
    }
    this.userService.login(obj)
    .pipe(first())
    .subscribe((data: HttpResponse<any>) => {
      this.cookieManagerService.set(data.headers.get('Authorization')!);
      this.router.navigateByUrl('/dashboard')
      })
    }
  }

