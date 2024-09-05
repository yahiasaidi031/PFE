import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {PaymentService} from "../../shared/service/payment.service";
import {CommonModule} from "@angular/common";
import {CharityService} from "../../shared/service/charity.service";
@Component({
  selector: 'app-create-charity',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './create-charity.component.html',
  styleUrl: './create-charity.component.css'
})
export class CreateCharityComponent {
  formCharity: FormGroup
  submitted : boolean= false;
  typeOptions : Array<{ value: string, label: string }> = [
    { value: "30", label: "Association" },
    { value: "29", label: "Solidarité" },
    { value: "39", label: "Education" },
    { value: "40", label: "Environnement" },
    { value: "41", label: "Santé" },
    { value: "36", label: "Evènement" },
    { value: "32", label: "Anniversaire" },
    { value: "33", label: "Pot de départ" },
    { value: "34", label: "Mariage" },
    { value: "35", label: "Voyage" },
    { value: "38", label: "Cadeau commun" },
    { value: "37", label: "Soirée" },
    { value: "31", label: "Autre" }
  ];

  constructor(private fb: FormBuilder, private charityService: CharityService) {
    this.formCharity = this.fb.group({
      title: ['', Validators.required],
      beneficiary: ['', Validators.required],
      object: [''],
      type: [null, Validators.required],
    });
  }

    async createCharity() {
      if (this.formCharity.invalid) {
        this.submitted=true;
        return;
      }
      console.log(this.formCharity.value)
      let data = this.formCharity.value;
      await this.charityService.addCharity(data)
          .then((response) => {

      });

  }
}
