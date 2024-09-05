import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./pages/nav-bar/nav-bar.component";
import {FooterComponent} from "./pages/footer/footer.component";
import {SwiperModule} from "ngx-swiper-wrapper";
import {FAQComponent} from "./pages/faq/faq.component";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {ToastrModule} from "ngx-toastr";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
            RouterOutlet,
            NavBarComponent,
            FooterComponent,
            ]
})
export class AppComponent {
  title = 'front_app';
}
