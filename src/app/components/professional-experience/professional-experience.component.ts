import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.css']
})
export class ProfessionalExperienceComponent implements OnInit{

  expe: Experiencia[] = [];
  constructor(private expServ: ExperienciaService, private tokenServ: TokenService) {
  }

  isLogged = false;

  ngOnInit(): void {

    this.cargarExperiencia();
    if (this.tokenServ.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    
  }

  cargarExperiencia(): void{
    this.expServ.lista().subscribe(
      data => { this.expe = data; }
    )
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.expServ.delete(id).subscribe(data => {
        this.cargarExperiencia();
      }, err => {
        alert("No se pudo eliminar");
      }
      )
    }
    
  }
}
