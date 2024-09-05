import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrl = 'http://localhost:8002';

  constructor(private httpClient: HttpClient) { }

  signUp(body: any): Promise<any>  {
    return this.httpClient.post<any>(this.baseUrl + '/user/signup', body).toPromise();
  }

  forgetPasswordFirstStep(body: any): Promise<any>  {
    return this.httpClient.post<any>(this.baseUrl + '/user/send-reset-otp', body).toPromise();
  }
  getCode(body: any): Promise<any>  {
    return this.httpClient.post<any>(this.baseUrl + '/api/code', body).toPromise();
  }

  updatePassword(body: any, email: any): Promise<any>  {
    const url = `${this.baseUrl}/password/${email}/`;
    return this.httpClient.put<any>(url, body).toPromise();
  }

  forgetPasswordSecondStep(body: any): Promise<any>  {
    return this.httpClient.post<any>(this.baseUrl + '/user/reset-password', body).toPromise();
  }

}
