import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  readonly baseUrl = 'http://localhost:8002';

  constructor(private httpClient: HttpClient) { }

  signUp(body: any): Promise<any>  {
    return this.httpClient.post<any>(this.baseUrl + '/contact', body).toPromise();
  }

  sendContact(body: any): Promise<any>  {
    return this.httpClient.post<any>(this.baseUrl + '/contact', body).toPromise();
  }
}
