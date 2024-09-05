import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressProjectService {
  readonly baseUrl = 'http://localhost:8006';

  constructor(private httpClient: HttpClient) { }

  get_progress_project(): Promise<any> {
    return this.httpClient.get<any>(this.baseUrl + '/avancements').toPromise();
  }
  
}
