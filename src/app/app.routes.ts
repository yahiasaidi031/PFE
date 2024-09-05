  import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { DonComponent } from './pages/don/don.component';
import { DetailsProjectComponent } from './pages/details-project/details-project.component';
import {ContactComponent} from "./pages/contact/contact.component";
import {CreateCharityComponent} from "./pages/create-charity/create-charity.component";
import {FAQComponent} from "./pages/faq/faq.component";
import {ForgetPasswordComponent} from "./pages/forget-password/forget-password.component";
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MaterialCharityComponent } from './pages/material-charity/material-charity.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'dashboard',
        component:DashbordComponent
    },
    {
        path:'don',
        component:DonComponent
    },
    {
        path:'details/:id',
        component:DetailsProjectComponent
    },
    {
      path:'contact',
      component:ContactComponent
    },
    {
      path:'create-charity',
      component:CreateCharityComponent
    },
    {
      path:'faq',
      component:FAQComponent
    },
    {
      path:'forget_password',
      component:ForgetPasswordComponent
    },
    {
      path:'sign-up',
      component:SignUpComponent
    }
    ,{
      path:'nav',
      component:NavBarComponent
    },{
      path:'about-us',
      component:AboutUsComponent
    },{
      path: 'don/material',
      component: MaterialCharityComponent
    }
];
