import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getPersonas(): Observable<Persona> {
    console.log("equipo corriendo");
    return this.http.get<Persona>(this.URL + '/buscar/persona/3');
  }
}
