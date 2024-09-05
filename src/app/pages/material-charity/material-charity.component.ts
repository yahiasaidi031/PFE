import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CharityService } from '../../shared/service/charity.service';
import { ToastrService } from 'ngx-toastr';
import { appConfig } from '../../app.config';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-charity',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './material-charity.component.html',
  styleUrl: './material-charity.component.css'
})
export class MaterialCharityComponent {
  formDon: FormGroup;
  submitted : boolean= false;
  basicRadialbarChart: any;
  details_project: any;
  imageUrl: any;
  rest_price: any;
  percent: any;
  userid: any;
  disabled:boolean=false

  constructor(private fb: FormBuilder, private translate: TranslateService, private charityService: CharityService, private toastService: ToastrService,  private router: Router,) {
    this.translate.setDefaultLang('fr');

    this.formDon = this.fb.group({
      nom: [{ value: '', disabled: false }, Validators.required],
      prenom: [{ value: '', disabled: false }, Validators.required],
      email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      telephone: [{ value: '', disabled: false }, [Validators.required]],
      materiel: ['', [Validators.required]],
      message: ['', Validators.required]
   });
  }

  ngOnInit() {
    this.userid = localStorage.getItem('user_front_office_charity');
    this.userid= JSON.parse(this.userid)
    console.log(this.details_project)
    if (this.userid) {
      this.disabled=true;
      this.formDon.get('nom')?.setValue(this.userid.firstname);
      this.formDon.get('nom')?.disable();

      this.formDon.get('prenom')?.setValue(this.userid.lastname);
      this.formDon.get('prenom')?.disable();

      this.formDon.get('email')?.setValue(this.userid.email);
      this.formDon.get('email')?.disable();

      this.formDon.get('telephone')?.setValue(this.userid.phone);
      this.formDon.get('telephone')?.disable();
    }
  }

  async saveDon() {
    this.formDon.value.nom = this.formDon.get('nom')?.value;
    this.formDon.value.prenom = this.formDon.get('prenom')?.value;
    this.formDon.value.email = this.formDon.get('email')?.value;
    this.formDon.value.telephone = this.formDon.get('telephone')?.value;
    console.log(this.formDon.value);

    if (this.formDon.invalid) {
      this.submitted=true;
      return;
    }

    await this.charityService.addMaterial( this.formDon.value).then(async(response) => {
      console.log(response)
      this.toastService.success('Material charity added with success!', 'Congratulation!');
      this.router.navigate(['/dashboard']);

      })
      .catch((error) => {
        console.error('Error adding material charity:', error);
      });

  }


}
