import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from "@angular/forms";
import {PaymentService} from "../../shared/service/payment.service";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {UserService} from "../../shared/service/user.service";
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule // Import TranslateModule here

  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  formSignUp: FormGroup;
  personalInfo!: FormGroup;
  enterpriseInfo!: FormGroup;

  formIsEntreprise!: FormGroup;
  submitted : boolean= false;
  require: boolean=false;
  first_boolean: boolean=false;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private paymentService: PaymentService, private userService: UserService, private translate: TranslateService ,private router: Router) {
    this.translate.setDefaultLang('fr');


    this.formSignUp = this.fb.group({
      personalInfo: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        isEnterprise: [false],
        phone: ['', [Validators.required]],
      }),
      enterpriseInfo: this.fb.group({
        companyName: [''],
        companyRegistrationNumber: [''],
        email: ['', [Validators.email]],
        isEnterprise: [true],
        password: ['', [ Validators.minLength(8)]],
        phone: [''],

      })
    });

    this.formSignUp.get('personalInfo.isEnterprise')?.valueChanges.subscribe(isEnterprise => {
      this.updateEnterpriseValidators(isEnterprise);
    });

    this.updateEnterpriseValidators(this.formSignUp.get('personalInfo.isEnterprise')?.value);
  }

  updateEnterpriseValidators(isEnterprise: boolean) {
    const firstNameControl = this.formSignUp.get('personalInfo.firstname');
    const lastNameControl = this.formSignUp.get('personalInfo.lastname');
    const emailControl = this.formSignUp.get('personalInfo.email');
    const passwordControl = this.formSignUp.get('personalInfo.password');
    const phoneControl = this.formSignUp.get('personalInfo.phone');


    const companyNameControl = this.formSignUp.get('enterpriseInfo.companyName');
    const companyRegistrationNumberControl = this.formSignUp.get('enterpriseInfo.companyRegistrationNumber');

    if (isEnterprise) {
      companyNameControl?.setValidators([Validators.required]);
      companyRegistrationNumberControl?.setValidators([Validators.required]);
      firstNameControl?.clearValidators();
      lastNameControl?.clearValidators();
      emailControl?.clearValidators();
      passwordControl?.clearValidators();
      phoneControl?.clearValidators();


    } else {
      companyNameControl?.clearValidators();
      companyRegistrationNumberControl?.clearValidators();
    }

    companyNameControl?.updateValueAndValidity();
    companyRegistrationNumberControl?.updateValueAndValidity();
    firstNameControl?.updateValueAndValidity();
    lastNameControl?.updateValueAndValidity();
    emailControl?.updateValueAndValidity();
    passwordControl?.updateValueAndValidity();
    phoneControl?.updateValueAndValidity();


  }



  update_check_box() {
    this.require = !this.require;
  }

  async onSubmit() {
    console.log(this.formSignUp)
    let updatedObject: any;

    if (this.formSignUp.invalid) {
      console.log('first form invalid');
      this.first_boolean = true;
      return;
    }
    let initialObject= this.formSignUp.value;
    console.log({initialObject})
    if (!initialObject.isEnterprise) {
      updatedObject = {
        firstname: initialObject.personalInfo.firstname,
        lastname: initialObject.personalInfo.lastname,
        email: initialObject.personalInfo.email,
        password: initialObject.personalInfo.password,
        isEnterprise: initialObject.personalInfo.isEnterprise,
        phone: initialObject.personalInfo.phone
      }
    } else {
    // Update the object to the desired format
    updatedObject = {
      isEnterprise: initialObject.personalInfo.isEnterprise,
      companyName: initialObject.enterpriseInfo.companyName,
      companyRegistrationNumber: initialObject.enterpriseInfo.companyRegistrationNumber,
      companyEmail: initialObject.enterpriseInfo.email,
      companyPassword: initialObject.enterpriseInfo.password,
      companyPhone: initialObject.enterpriseInfo.phone

    };
    }
 

    await this.userService.signUp(updatedObject)
      .then((response) => {
        console.log(response)
        if (response) {
          this.toastr.info('Utilisateur créer avec succèes', 'Charity');
          this.router.navigate(['/login']);
        }else {
          this.toastr.info('L\'email existe déjà', 'Erreur');
        }
      });


  }
}
