import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Store, StoreModule } from '@ngrx/store';
import { fetchcourcegriddata } from "../../store/Learning-cources/cources.action";
import { selectgridData } from "../../store/Learning-cources/cources.selector";
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { ProjectService } from '../../shared/service/project.service';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [
    CommonModule,
    SlickCarouselModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    PaginationModule,
    ProgressbarModule,
    TranslateModule

  ],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {
  fadeConfig = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    arrows: false
  }

  slides = [
    { img: "assets/images/products/Environnement.jpg" },
    { img: "assets/images/products/Solidarity.jpg" },
    { img: "assets/images/products/Education.jpg" },
    { img: "assets/images/products/Organization.jpg" }
  ];

  products: any;
  // listData!: any;
  // gridlist: any;
  //
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false
  };

  productdetail = {
    id: '1',
    title: 'Unite Wear Solid Men Hooded Neck Blue T-Shirt',
    image: ['assets/images/products/Environnement.jpg', 'assets/images/products/Solidarity.jpg', 'assets/images/products/Education.jpg', 'assets/images/products/Organization.jpg'],
    sold: '3.7',
    ratings: '3.5',
    publish: '26 Mar, 2021',
  }
  productslist: any;
  productlist: any;
  endItem: any;
  count_project: any;
  searchTerm: any;

  constructor(private translate: TranslateService, private formBuilder: FormBuilder, private projectService: ProjectService, private router: Router,) {
    this.translate.setDefaultLang('fr');

  }
  async ngOnInit() {
    this.get_all_project();

  }

  search() {
    console.log('Search term:', this.searchTerm);

    let attributedata = this.productlist.filter((el: any) => el.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || el.category.content.toLowerCase().includes(this.searchTerm.toLowerCase()) || el.tags.tag.toLowerCase().includes(this.searchTerm.toLowerCase()))
    this.products = attributedata;
  }

  async get_all_project() {
    await this.projectService.get_all_projects().then((response: any) => {
      console.log(response)
      this.count_project = response.length;
      response.forEach((item: any) => {
        if (item.image && item.image.startsWith('uploads/')) {
          item.image = 'http://localhost:8006/' + item.image.replace('uploads/', '');
        }
      });

      console.log(response);
      this.productlist = response;
      this.products = this.productlist.slice(0, 12);
      console.log(this.products);

    })
      .catch((error) => {
        console.error('Error get projects:', error);
      });
  }



  currentTab: any = 'property';
  // Change Tab Content
  changeTab(tab: string) {
    this.currentTab = tab;
  }

  slickChange(event: any) {
    const swiper = document.querySelectorAll('.swiperlist')
  }

  // Hide/Show Filter
  showFilter() {
    const filterStyle = (document.getElementById("propertyFilters") as HTMLElement).style.display;
    if (filterStyle == 'none') {
      (document.getElementById("propertyFilters") as HTMLElement).style.display = 'block'
    } else {
      (document.getElementById("propertyFilters") as HTMLElement).style.display = 'none'
    }
  }

  // Add to starr
  starredproduct(id: any, event: any, star: any) {
    event.target.classList.toggle('active')
    if (star == false) {
      this.products[id].starred = true
    } else {
      this.products[id].starred = false
    }
  }

  // Page changed
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.products = this.productlist.slice(startItem, this.endItem);
  }

  goTo(data: any) {
    console.log('go to')
    this.router.navigate(['/details/', data._id]);
    localStorage.setItem('details_project', JSON.stringify(data));

  }

  imageSrc(path: string) {
    return `http://localhost:8006/${path}`
  }
}
