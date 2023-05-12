import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Education } from 'src/app/model/education';
import { EducationService } from 'src/app/service/education.service';
import { ImagenService } from 'src/app/service/imagen.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  eduEdit: Education = new Education('','','','','');
  edu: Education[] = [];
  constructor(private eduServ: EducationService, private tokenServ: TokenService,
    private router: Router, public imgServ: ImagenService) {
  }

  nombreCurso: string = '';
  infoCurso: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  imagen: string = '';
  idBoton: number = 0;

  loadingImage = false;
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
      if (idx != this.idBoton) {
        this.isEditing = true;
        this.idBoton = idx;
        console.log(idx);
        this.eduServ.details(idx).subscribe(datax => {
          this.eduEdit = datax, this.imgServ.url = this.eduEdit.imagen;
        }, err => {
          alert("Error al modificar educacion");
          this.router.navigate(['']);
        }
        )
      } else {
        this.isEditing = !this.isEditing;
      }
    }
  }

  onUpdate(idx?: number) {
    this.eduEdit.imagen = this.imgServ.url;
    this.eduServ.update(idx, this.eduEdit).subscribe(data => {
      alert("modificacion exitosa");
      this.router.navigate(['']);
      window.location.reload();
    }, err => {
      alert("Error al modificar educacion");
      this.router.navigate(['']);
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
        this.router.navigate(['']);
        window.location.reload();
      }, err => {
        alert("No se pudo eliminar");
        this.router.navigate(['']);
        }
      )
    }
  }
   
  onCreate() {
    this.eduEdit.imagen = this.imgServ.url;
    //const educ = new Education(this.nombreCurso, this.infoCurso, this.fechaInicio, this.fechaFin, this.imagen);
    this.eduServ.save(this.eduEdit).subscribe(
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
    this.isEditing = false;
    this.agregarCurso = !this.agregarCurso;
  }

  loading() {
    this.loadingImage = true;
  }

  uploadImage($event: any) {
    const name = 'edu' + this.eduEdit.nombreCurso;
    console.log(name),
      this.imgServ.uploadImage($event, name);
    this.loadingImage = false;
  }
}