import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { PaymentService } from "../../shared/service/payment.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

// Import FontAwesome libraries
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressProjectService } from '../../shared/service/progress-project.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-details-project',
  standalone: true,
  imports: [
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    TranslateModule,
    ShareButtonsModule,
    ShareIconsModule,
    FontAwesomeModule,
    CommonModule
    

  ],
  templateUrl: './details-project.component.html',
  styleUrl: './details-project.component.css'
})
export class DetailsProjectComponent {
  submitted: boolean = false;
  basicRadialbarChart: any;
  price: any;
  collect_price: any;
  rest_price: any;
  id: any;
  details_project: any;
  percent: any;
  baseUrl: any;
  imgUrl: any;
  video: any;
  imageUrl: any;
  avancements: any[] = [];
  constructor(private fb: FormBuilder, private router: Router, private translate: TranslateService, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private progressProjectService: ProgressProjectService) {
    this.translate.setDefaultLang('fr');

  }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getProgressProject(this.id);

    this.details_project = localStorage.getItem('details_project');
    this.details_project = JSON.parse(this.details_project)
    console.log(this.details_project)
    this.baseUrl = 'http://localhost:8006/';

    if (this.details_project) {
      this.imageUrl = this.baseUrl + this.details_project.image
      this.details_project.avancements.forEach((avancement:any) => {
        avancement.imgUrl = this.baseUrl + avancement.image;
        avancement.videoUrl = this.baseUrl + avancement.video;
        console.log(avancement.imgUrl)
        console.log(avancement.videoUrl)
      });
    
      
      this.percent = this.calculatePercentage(parseInt(this.details_project.compagniecollect[this.details_project.compagniecollect.length - 1]['montant']), parseInt(this.details_project.compagniecollect[this.details_project.compagniecollect.length - 1]['objectivemontant']))
      console.log(this.percent)
      this.rest_price = parseInt(this.details_project.compagniecollect[this.details_project.compagniecollect.length - 1]['objectivemontant']) - parseInt(this.details_project.compagniecollect[this.details_project.compagniecollect.length - 1]['montant']);
      this._basicRadialbarChart('["--tb-primary"]');
      this.cdr.detectChanges();
   
    }
  }
  

  async getProgressProject(projectId: any) {
    let currentDate = new Date(); // Current date and time

    await this.progressProjectService.get_progress_project().then((response: any) => {
      console.log(response)
      let res = response.filter((x: any) => x.projectId === projectId && new Date(x.createdAt) > currentDate);



    })
      .catch((error) => {
        console.error('Error get progress projects:', error);
      });
  }

  calculatePercentage(part: any, total: any) {
    return (part / total) * 100;
  }

  private _basicRadialbarChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.basicRadialbarChart = {
      series: [this.percent.toFixed(2)],  // Ensure this.percent is defined before calling this method
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

  share() {

  }

  doCharity() {
    let token = localStorage.getItem("login_token_donation");
    this.router.navigateByUrl('/don')

     if(token) {
      this.router.navigateByUrl('/don')
     }
     else {
      this.router.navigateByUrl('/login')
    
     }

  }
  Charity(event: Event) {
    event.preventDefault(); 

    let token = localStorage.getItem("login_token_donation");
    if (token) {
        this.router.navigateByUrl('/don/material');
    } else {
        this.router.navigateByUrl('/login');
    }

}
}