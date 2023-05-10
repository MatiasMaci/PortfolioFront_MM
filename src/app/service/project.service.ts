import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projURL = environment.URL + '/project'

  //projURL = 'http://localhost:8080/project'
  //projURL = 'https://portfoliobackendmm.onrender.com/project'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.projURL + '/lista');
  }

  public details(id: number): Observable<Project> {
    return this.httpClient.get<Project>(this.projURL + `/detail/${id}`);
  }

  public save(project: Project): Observable<any> {
    return this.httpClient.post<any>(this.projURL + '/create', project);
  }

  public update(id: number, project: Project): Observable<any> {
    return this.httpClient.put<any>(this.projURL + `/update/${id}`, project);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.projURL + `/delete/${id}`);
  }
}
