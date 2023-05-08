import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-new-experience',
  templateUrl: './new-experience.component.html',
  styleUrls: ['./new-experience.component.css']
})
export class NewExperienceComponent implements OnInit{

  nombreEmpresa: string = '';
  infoPuesto: string = '';
  constructor(private expServ: ExperienciaService, private router: Router){}

  ngOnInit(): void {
    
  }
/*
  onCreate() {
    const expe = new Experiencia(this.nombreEmpresa, this.infoPuesto);
    this.expServ.save(expe).subscribe(
      data => {
        alert("Experiencia añadida");
        this.router.navigate(['']);
      }, err => {
        alert("Fallo");
        this.router.navigate(['']);
      }
    )
  }*/
}
