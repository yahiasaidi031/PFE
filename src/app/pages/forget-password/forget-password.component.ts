import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../../shared/service/user.service";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forget-password',
  standalone: true,
    imports: [
        FormsModule,  
        CommonModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  formForgetPassword: FormGroup;
  step1: boolean=true;
  step2: boolean=false;
  step3: boolean=false;
  myCode: any;


  constructor(private http: HttpClient ,private router: Router, private userService: UserService, private fb: FormBuilder, private translate: TranslateService, private toastService: ToastrService ) {
    this.translate.setDefaultLang('fr');
    this.formForgetPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],

    });
  }

  recent_email: any;

  async forgetPassword2() {
    if (this.step2) {
      let data= { otp: this.myCode, newPassword: this.formForgetPassword.value.password};

      await this.userService.forgetPasswordSecondStep(data)
      .then((response) => {
        console.log(response)
      })
    }
  }

  async forgetPassword() {
    if (this.step1) {
      this.recent_email = this.formForgetPassword.value.email;
      let data = { email: this.formForgetPassword.value.email };
  
      try {
        const response = await this.userService.forgetPasswordFirstStep(data);
  
        if (response) {
          this.toastService.success('Code sent successfully!', 'Congratulations!');
          this.step1 = false;
          this.step2 = true;
        } 
      } catch (error) {
        console.error('Error in forgetPassword:', error);
        this.toastService.error('Email not found.', 'Error');
      }
    }
  }

}
