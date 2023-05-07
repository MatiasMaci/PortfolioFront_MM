import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  persURL = 'http://localhost:8080/persona'
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.persURL + '/lista');
  }

  public details(id: number): Observable<Persona> {
    return this.httpClient.get<Persona>(this.persURL + `/detail/${id}`);
  }

  public save(persona: Persona): Observable<any> {
    return this.httpClient.post<any>(this.persURL + '/create', persona);
  }

  public update(id: number, persona: Persona): Observable<any> {
    return this.httpClient.put<any>(this.persURL + `/update/${id}`, persona);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.persURL + `/delete/${id}`);
  }
  /*
  public getPersonas(): Observable<Persona> {
    console.log("equipo corriendo");
    return this.http.get<Persona>(this.URL + '/buscar/persona/3');
  }
  */
}
