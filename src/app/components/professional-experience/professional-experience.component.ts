import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.css']
})
export class ProfessionalExperienceComponent implements OnInit {

  expEdit: Experiencia = null;
  exp: Experiencia[] = [];
  constructor(private expServ: ExperienciaService, private tokenServ: TokenService,
    private router: Router) {
  }

  nombreEmpresa: string = '';
  infoPuesto: string = '';

  isEditing = false;
  isLogged = false;
  agregarExperiencia = false;

  ngOnInit(): void {
    this.cargarExperiencia();
    if (this.tokenServ.getToken()) {
      this.isLogged = true;
      console.log(this.isEditing);
      if (this.isEditing == true) {
        this.onEditInit();
      }
    } else {
      this.isLogged = false;
    }
  }

  onEditInit(idx?: number) {
    if (idx != undefined) {
      this.agregarExperiencia = false;
      this.isEditing = !this.isEditing;
      console.log(idx);
      this.expServ.details(idx).subscribe(datax => {
        this.expEdit = datax
      }, err => {
        alert("Error al modificar habilidad");
        this.router.navigate([''])
      }
      )
    }
  }

  onUpdate(idx?: number) {
    this.expServ.update(idx, this.expEdit).subscribe(data => {
      alert("modificacion exitosa");
      this.router.navigate(['']);
      window.location.reload();
    }, err => {
      alert("Error al modificar habilidad");
      this.router.navigate([''])
      window.location.reload();
    })
  }

  cargarExperiencia(): void {
    this.expServ.lista().subscribe(
      data => { this.exp = data; }
    )
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.expServ.delete(id).subscribe(data => {
        this.cargarExperiencia();
        alert("Se elimino correctamente");
        window.location.reload();
      }, err => {
        alert("No se pudo eliminar");
        window.location.reload();
      }
      )
    }
  }

  onCreate() {
    const expe = new Experiencia(this.nombreEmpresa, this.infoPuesto);
    this.expServ.save(expe).subscribe(
      data => {
        alert("Habilidad añadida");
        this.router.navigate(['']);
        window.location.reload();
      }, err => {
        alert("Fallo");
        this.router.navigate(['']);
        window.location.reload();
      }
    )
  }

  onClick() {
    this.isEditing = false;
    this.agregarExperiencia = !this.agregarExperiencia;
  }
}

 /*
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
}*/
