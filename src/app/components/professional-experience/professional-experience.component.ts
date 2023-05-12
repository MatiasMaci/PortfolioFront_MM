import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { ImagenService } from 'src/app/service/imagen.service';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.css']
})
export class ProfessionalExperienceComponent implements OnInit {

  expEdit: Experiencia = new Experiencia('','','','','')
  exp: Experiencia[] = [];
  constructor(private expServ: ExperienciaService, private tokenServ: TokenService,
    private router: Router, public imgServ:ImagenService) {
  }

  nombreEmpresa: string = '';
  infoPuesto: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  imagen: string = '';
  idBoton: number = 0;

  loadingImage = false;
  isEditing = false;
  isLogged = false;
  agregarExperiencia = false;

  ngOnInit(): void {
    this.cargarExperiencia();
    this.isEditing = false;
    this.agregarExperiencia = false;
    console.log(environment.URL);
    if (this.tokenServ.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onEditInit(idx?: number) {
    if (idx != undefined) {
      this.agregarExperiencia = false;
      if (idx != this.idBoton) {
        this.isEditing = true;
        this.idBoton = idx;
        console.log(idx);
        this.expServ.details(idx).subscribe(datax => {
          this.expEdit = datax, this.imgServ.url = this.expEdit.imagen;
        }, err => {
          alert("Error al modificar experiencia");
          this.router.navigate([''])
          this.ngOnInit();
        }
        )
      }
      else{
        this.isEditing = !this.isEditing;
      }
      
    }
  }

  onUpdate(idx?: number) {
    this.expEdit.imagen = this.imgServ.url;
    console.log(this.expEdit.fechaFin)
    this.expServ.update(idx, this.expEdit).subscribe(data => {
      alert("modificacion exitosa");
      this.router.navigate(['']);
      this.ngOnInit();
    }, err => {
      alert("Error al modificar experiencia");
      this.router.navigate([''])

    })
  }

  cargarExperiencia(): void {
    this.expServ.lista().subscribe(
      data => { this.exp = data; console.log()}
    )
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.expServ.delete(id).subscribe(data => {
        this.cargarExperiencia();
        alert("Se elimino correctamente");
        this.ngOnInit();
      }, err => {
        alert("No se pudo eliminar");
      }
      )
    }
  }

  onCreate() {
    this.expEdit.imagen = this.imgServ.url;
    //const expe = new Experiencia(this.nombreEmpresa, this.infoPuesto, this.fechaInicio, this.fechaFin, this.imagen);
    this.expServ.save(this.expEdit).subscribe(
      data => {
        alert("Experiencia añadida");
        this.router.navigate(['']);
        this.ngOnInit();
      }, err => {
        alert("Fallo");
        this.router.navigate(['']);
      }
    )
  }

  onClick() {
    this.isEditing = false;
    this.expEdit = new Experiencia('', '', '', '', '')
    this.imgServ.url = "";
    this.agregarExperiencia = !this.agregarExperiencia;
  }

  loading() {
    this.loadingImage = true;
  }

  uploadImage($event: any) {
    const name = 'expe' + this.expEdit.nombreEmpresa;
    console.log(name),
    this.imgServ.uploadImage($event, name);
    this.loadingImage = false;
  }
}