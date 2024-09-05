import {Component, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SwiperConfigInterface, SwiperDirective} from "ngx-swiper-wrapper";
import { FAQ, FAQMain } from './faq.model';
import {FaqService} from "./faq.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// @ts-ignore
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAccordionModule,
    TranslateModule,
  ],
  providers: [FaqService],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {

  faqMain: any ;
  swiperIndex = 2;

  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  public swiperCenterOpt1Config: SwiperConfigInterface = {
    slidesPerView: 'auto',
    centeredSlides: true,
    initialSlide: 2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slideToClickedSlide: true
  };

  constructor(private faqService: FaqService, public translate: TranslateService,  ) {
    translate.setDefaultLang('fr');
    this.filter();
  }

  onIndexChange(index: number): void {
    this.swiperIndex = index;
    this.filter();
  }

  filter() {
    this.faqMain = this.faqService.faqmain.find((faqmain: FAQMain) => faqmain.typeId === this.swiperIndex);

  }
}
