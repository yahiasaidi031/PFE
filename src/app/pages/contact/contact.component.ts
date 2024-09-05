import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { latLng, tileLayer, circle, polygon, marker, icon, Layer } from 'leaflet';
import { ContactService } from '../../shared/service/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    CommonModule,
    TranslateModule,
    LeafletModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  objectOptions: Array<{ value: string, label: string }> = [
    { value: '', label: "Sélectionnez l'objet de votre demande" },
    { value: 'information', label: "Demande d'informations" },
    { value: 'partnership', label: "Demande de partenariat" },
    { value: 'complaint', label: 'Reclamation' },
    { value: 'unlock_request', label: 'Demande de déblocage' },
    { value: 'other', label: 'Autre sujet' }
  ];

  //center: google.maps.LatLngLiteral;
  options = {
    layers: [
      tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w",
        {
          maxZoom: 18,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
        }
      )
    ],
    zoom: 13,
    center: latLng(51.505, -0.09)
  };
  center = {
    lat: 36.857292807846314,
    lng: 10.193713969475555
  };

  contactForm: FormGroup;
  submitted : boolean= false;
  userid: any;

  constructor(private translate: TranslateService, private fb: FormBuilder, private contactService: ContactService, private toastService: ToastrService) {
    this.translate.setDefaultLang('fr');
    this.contactForm = this.fb.group({
      name: [{ value: '', disabled: false }, Validators.required],
      email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      phone: [{ value: '', disabled: false }, Validators.required],
      object: ['', Validators.required],
      message: ['', Validators.required]
    });

  }
  disabled:boolean=false
  ngOnInit() {
    this.userid = localStorage.getItem('user_front_office_charity');
    this.userid= JSON.parse(this.userid)
    console.log(this.userid)
    if (this.userid) {
      this.disabled=true;
      this.contactForm.get('name')?.setValue(this.userid.firstname+" "+this.userid?.lastname);
      this.contactForm.get('name')?.disable();

      this.contactForm.get('email')?.setValue(this.userid?.email);
      this.contactForm.get('email')?.disable();

      this.contactForm.get('phone')?.setValue(this.userid?.phone);
      this.contactForm.get('phone')?.disable();

    }
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.submitted = true;
      return;
    }
  
    // Log form values
    console.log('Form Values:', this.contactForm.value);
  
    await this.contactService.sendContact(this.contactForm.value).then(async (response) => {
      console.log(response);
      this.toastService.success('Contact added with success!', 'Congratulation!');
    }).catch((error) => {
      console.error('Error adding contact:', error);
    });
  }
}
