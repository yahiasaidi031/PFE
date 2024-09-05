import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CharityService {
  readonly baseUrl = 'http://127.0.0.1:8001';

  constructor(private httpClient: HttpClient) { }

  addCharity(body: any): Promise<any>  {
    return this.httpClient.post<any>(this.baseUrl + '/charity', body).toPromise();
  }

  addMaterial(body: any): Promise<any>  {
    return this.httpClient.post<any>(this.baseUrl + '/don/material', body).toPromise();
  }
}
