import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../shared/service/payment.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { NgApexchartsModule } from 'ng-apexcharts';
import { GoogleMapsModule } from '@angular/google-maps';
import {TranslateModule, TranslateService} from "@ngx-translate/core";


@Component({
    selector: 'app-don',
    standalone: true,
    templateUrl: './don.component.html',
    styleUrl: './don.component.css',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NavBarComponent,
    NgApexchartsModule,
    GoogleMapsModule,
    TranslateModule,

  ]
})
export class DonComponent {
  formDon: FormGroup;
  submitted : boolean= false;
  basicRadialbarChart: any;
  details_project: any;
  imageUrl: any;
  rest_price: any;
  percent: any;
  userid: any;
  disabled:boolean=false

  constructor(private fb: FormBuilder, private paymentService: PaymentService, private translate: TranslateService, private cdr: ChangeDetectorRef) {
    this.translate.setDefaultLang('fr');

    this.formDon = this.fb.group({
      name: [{ value: '', disabled: false }, Validators.required],
      lastname: [{ value: '', disabled: false },Validators.required],
      email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      montant: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      paymentMethod: ['', Validators.required]
  });
}




  ngOnInit() {
    this.userid = localStorage.getItem('user_front_office_charity');
    this.details_project = localStorage.getItem('details_project');
    this.details_project= JSON.parse(this.details_project)
    this.userid= JSON.parse(this.userid)
    console.log(this.details_project)
    if (this.userid) {
      this.disabled=true;
      this.formDon.get('name')?.setValue(this.userid.firstname);
      this.formDon.get('name')?.disable();

      this.formDon.get('lastname')?.setValue(this.userid.lastname);
      this.formDon.get('lastname')?.disable();

      this.formDon.get('email')?.setValue(this.userid.email);
      this.formDon.get('email')?.disable();
    }

    
    this.imageUrl = 'http://localhost:8006/';

    if (this.details_project) {
      this.imageUrl = this.details_project.image
      console.log(this.imageUrl)
      this.percent = this.calculatePercentage(parseInt(this.details_project.compagniecollect[this.details_project.compagniecollect.length - 1]['montant']), parseInt(this.details_project.compagniecollect[this.details_project.compagniecollect.length - 1]['objectivemontant']))
      console.log(this.percent)
      this.rest_price = parseInt(this.details_project.compagniecollect[this.details_project.compagniecollect.length - 1]['objectivemontant']) - parseInt(this.details_project.compagniecollect[this.details_project.compagniecollect.length - 1]['montant']);
      this._basicRadialbarChart('["--tb-primary"]');
      // Explicitly mark for change detection
      this.cdr.detectChanges();
    }
  }

  calculatePercentage(part: any, total: any) {
    return (part / total) * 100;
  }


  async saveDon() {
    if (this.formDon.invalid) {
      this.submitted=true;
      return;
    }
    let data = { "userId": this.userid._id, 
      "compagneCollectId": this.details_project.compagniecollect[this.details_project.compagniecollect.length - 1]._id, 
      "montant": this.formDon.value.montant }

    if (this.formDon.value.paymentMethod === "flouci") {
        await this.paymentService.addPayment(data)
        .then((response) => {
          console.log(response)
          if (response) {
            if (response.flouciData.result.link){
              let paymentUrl = response.flouciData.result.link;
              window.open(paymentUrl, '_blank');

              }

            }
          })
          .catch((error) => {
            console.error('Error adding payment:', error);
          });
    }

    if (this.formDon.value.paymentMethod === "konnect") {
      await this.paymentService.paymentKonnect(data)
      .then((response) => {
        console.log(response)
        if (response) {
          if (response.konnectData.payUrl){
            let paymentUrl = response.konnectData.payUrl;
            window.open(paymentUrl, '_blank');

            }
          }
        })
        .catch((error) => {
          console.error('Error adding payment konnect:', error);
        });

    }

  }


  private _basicRadialbarChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.basicRadialbarChart = {
      series: [this.percent.toFixed(2)],
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      labels: [""],
      colors: ["#008000", "#FF0000"],
    };

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._basicRadialbarChart('["--tb-primary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }


    // Chart Colors Set
    private getChartColorsArray(colors: any) {
      colors = JSON.parse(colors);
      return colors.map(function (value: any) {
        var newValue = value.replace(" ", "");
        if (newValue.indexOf(",") === -1) {
          var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
          if (color) {
            color = color.replace(" ", "");
            return color;
          }
          else return newValue;;
        } else {
          var val = value.split(',');
          if (val.length == 2) {
            var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
            rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
            return rgbaColor;
          } else {
            return newValue;
          }
        }
      });
    }
    imageSrc(path: string) {
      return `http://localhost:8006/${path}`
    }
}
