import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly baseUrl = 'http://localhost:8006';

  constructor(private httpClient: HttpClient) { }

  create_project(body: any): Promise<any>  {
    return this.httpClient.post<any>(this.baseUrl + '/project/create', body).toPromise();
  }

  get_all_projects(): Promise<any> {
    return this.httpClient.get<any>(this.baseUrl + '/projects').toPromise();
  }

  edit_project(projectId: number, body: any): Promise<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/project/${projectId}`, body).toPromise();
  }

  delete_project(projectId: number): Promise<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/project/${projectId}`).toPromise();
  }
}
