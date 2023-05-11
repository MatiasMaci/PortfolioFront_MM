import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banner } from '../model/banner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  banURL = environment.URL + '/banner'

  //banURL = 'http://localhost:8080/banner'
  //banURL = 'https://portfoliobackendmm.onrender.com/banner'
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Banner[]> {
    return this.httpClient.get<Banner[]>(this.banURL + '/lista');
  }

  public details(id: number): Observable<Banner> {
    return this.httpClient.get<Banner>(this.banURL + `/detail/${id}`);
  }

  public save(banner: Banner): Observable<any> {
    return this.httpClient.post<any>(this.banURL + '/create', banner);
  }

  public update(id: number, banner: Banner): Observable<any> {
    return this.httpClient.put<any>(this.banURL + `/update/${id}`, banner);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.banURL + `/delete/${id}`);
  }
}
