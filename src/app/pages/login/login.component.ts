import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule,NavBarComponent, RouterModule, CommonModule, ReactiveFormsModule, TranslateModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent {
  LoginObj: any = {
    "email":"",
    "password":""
  };
  constructor(private http: HttpClient ,private router: Router,  private translate: TranslateService) {
    this.translate.setDefaultLang('fr');

  }


  onLogin() {
    // debugger;
    this.http.post('http://localhost:8002/user/login', this.LoginObj)
      .subscribe((res: any) => {
        console.log(res)
        if (res.result) {
          localStorage.setItem('login_token_donation', res.token);
          localStorage.setItem('user_front_office_charity', JSON.stringify(res.user));
          console.log('Navigating to /dashboard...');
          this.router.navigate(['/dashboard']);
          console.log('Navigation attempted.');
        } else {
          alert(res.message);
        }
      });
  }

}
