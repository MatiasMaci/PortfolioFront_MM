import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skills } from '../model/skills';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  skillURL= environment.URL + '/skills'

  //skillURL = 'http://localhost:8080/skills'
  //skillURL = 'https://portfoliobackendmm.onrender.com/skills'


  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Skills[]> {
    return this.httpClient.get<Skills[]>(this.skillURL + '/lista');
  }

  public details(id: number): Observable<Skills> {
    return this.httpClient.get<Skills>(this.skillURL + `/detail/${id}`);
  }

  public save(skill: Skills): Observable<any> {
    return this.httpClient.post<any>(this.skillURL + '/create', skill);
  }

  public update(id: number, skill: Skills): Observable<any> {
    return this.httpClient.put<any>(this.skillURL + `/update/${id}`, skill);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.skillURL + `/delete/${id}`);
  }
}
