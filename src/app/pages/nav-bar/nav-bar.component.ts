import { AfterViewInit, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {CommonModule} from "@angular/common";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import * as bootstrap from 'bootstrap';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NgbDropdownModule,
    BsDropdownModule,

  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements AfterViewInit {
  selectedLanguageText = "Francais";
  selectedLanguageFlag = "./assets/img/flags/fr.png";
  user: any;
  isLoggedIn: boolean = false;


  constructor(private http: HttpClient ,private router: Router, public translate: TranslateService) {
    const browserLang: any = 'fr';
    translate.use(browserLang.match(/fr|en/) ? browserLang : "fr");

  }

  ngOnInit() {
    this.user = localStorage.getItem("user_front_office_charity");
    if (this.user) {
      this.user = JSON.parse(this.user)
      console.log(this.user)
    }

  }

  login() {
    this.router.navigateByUrl('/login')
  }

  charity() {
    this.router.navigateByUrl('/create-charity')

  }



  option1() {
    // Logic for option 1
  }

  option2() {
    // Logic for option 2
  }

  option3() {
    // Logic for option 3
  }


  ChangeLanguage(language: string) {
    this.translate.use(language);

    if (language === 'en') {
      this.selectedLanguageText = "English";
      this.selectedLanguageFlag = "./assets/img/flags/us.png";
    }
    else if (language === 'fr') {
      this.selectedLanguageText = "French";
      this.selectedLanguageFlag = "./assets/img/flags/fr.png";
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.user="";
  }

  ngAfterViewInit() {
    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl);
    });
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);

  }
}
