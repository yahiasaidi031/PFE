import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClient, provideHttpClient} from '@angular/common/http';

import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "./pages/nav-bar/nav-bar.component";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideHttpClient(),
              provideAnimations(),
              provideHttpClient(),
              provideToastr({
                timeOut: 10000,
                positionClass: 'toast-bottom-right',
                preventDuplicates: true,
              }),
              importProvidersFrom(TranslateModule.forRoot({
                loader: {
                  provide: TranslateLoader,
                  useFactory: HttpLoaderFactory,
                  deps: [HttpClient]
                }
              })),
  ]
};
