import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  readonly baseUrl = 'http://127.0.0.1:8001';

  constructor(private httpClient: HttpClient) { }

  addPayment(body: any): Promise<any>  {
    return this.httpClient.post<any>(this.baseUrl + '/paiement', body).toPromise();
  }

  paymentKonnect(body: any): Promise<any>  {
    return this.httpClient.post<any>(this.baseUrl + '/payements/init-payment', body).toPromise();
  }
}
