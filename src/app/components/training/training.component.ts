import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Education } from 'src/app/model/education';
import { EducationService } from 'src/app/service/education.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  eduEdit: Education = null;
  edu: Education[] = [];
  constructor(private eduServ: EducationService, private tokenServ: TokenService,
    private router: Router, private activatedRouter: ActivatedRoute) {
  }

  nombreCurso: string = '';
  infoCurso: string = '';

  isEditing = false;
  isLogged = false;
  agregarCurso = false;

  ngOnInit(): void {
    this.cargarEducation();
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
      this.agregarCurso = false;
      console.log(idx);
      this.eduServ.details(idx).subscribe(datax => {
        this.eduEdit = datax
      }, err => {
        alert("Error al modificar educacion");
        this.router.navigate([''])
      }
      )
    }
  }

  onUpdate(idx?: number) {
    this.eduServ.update(idx, this.eduEdit).subscribe(data => {
      alert("modificacion exitosa");
      this.router.navigate(['']);
      window.location.reload();
    }, err => {
      alert("Error al modificar experiencia");
      this.router.navigate([''])
      window.location.reload();
    })
  }

  cargarEducation(): void {
    this.eduServ.lista().subscribe(
      data => { this.edu = data; }
    )
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.eduServ.delete(id).subscribe(data => {
        this.cargarEducation();
        alert("Se elimino correctamente");
        window.location.reload();
      }, err => {
        alert("No se pudo eliminar");
        }
      )
    }
  }
   
  onCreate() {
    const educ = new Education(this.nombreCurso, this.infoCurso);
    this.eduServ.save(educ).subscribe(
      data => {
        alert("Educacion añadida");
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
    this.agregarCurso = !this.agregarCurso;
  }

}