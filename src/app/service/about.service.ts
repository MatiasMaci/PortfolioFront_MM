import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { About } from '../model/about'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
  
export class AboutService {

  aboutURL = environment.URL + '/about'

  //aboutURL = 'http://localhost:8080/about'
  //aboutURL = 'https://portfoliobackendmm.onrender.com/about'
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<About[]> {
    return this.httpClient.get<About[]>(this.aboutURL + '/lista');
  }

  public details(id: number): Observable<About> {
    return this.httpClient.get<About>(this.aboutURL + `/detail/${id}`);
  }

  /*
  //Crear nueva About
  public save(about: About): Observable<any> {
    return this.httpClient.post<any>(this.aboutURL + '/create', about);
  }
  */

  public update(id: number, about: About): Observable<any> {
    return this.httpClient.put<any>(this.aboutURL + `/update/${id}`, about);
  }

  /*
  //Eliminar un About
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.aboutURL + `/delete/${id}`);
  }
  */
}