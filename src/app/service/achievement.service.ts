import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Achievement } from '../model/achievement';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  achiURL = environment.URL + '/achievements'

  //achiURL = 'http://localhost:8080/achievements'
  //achiURL = 'https://portfoliobackendmm.onrender.com/achievements'
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Achievement[]> {
    return this.httpClient.get<Achievement[]>(this.achiURL + '/lista');
  }

  public details(id: number): Observable<Achievement> {
    return this.httpClient.get<Achievement>(this.achiURL + `/detail/${id}`);
  }

  public save(logros: Achievement): Observable<any> {
    return this.httpClient.post<any>(this.achiURL + '/create', logros);
  }

  public update(id: number, logros: Achievement): Observable<any> {
    return this.httpClient.put<any>(this.achiURL + `/update/${id}`, logros);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.achiURL + `/delete/${id}`);
  }
}
