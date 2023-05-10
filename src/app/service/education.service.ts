import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../model/education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  eduURL = environment.URL + '/education'

  //eduURL = 'http://localhost:8080/education'
  //eduURL = 'https://portfoliobackendmm.onrender.com/education'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(this.eduURL + '/lista');
  }

  public details(id: number): Observable<Education> {
    return this.httpClient.get<Education>(this.eduURL + `/detail/${id}`);
  }

  public save(education: Education): Observable<any> {
    return this.httpClient.post<any>(this.eduURL + '/create', education);
  }

  public update(id: number, education: Education): Observable<any> {
    return this.httpClient.put<any>(this.eduURL + `/update/${id}`, education);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.eduURL + `/delete/${id}`);
  }
}
