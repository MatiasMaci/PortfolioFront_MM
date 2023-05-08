import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {

  projEdit: Project = null;
  proj: Project[] = [];
  constructor(private projServ: ProjectService, private tokenServ: TokenService,
    private router: Router) {
  }

  nombreProject: string = '';
  informacion: string = '';


  isLogged = false;
  agregarProyecto = false;

  ngOnInit(): void {
    this.cargarProjectos();
    if (this.tokenServ.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarProjectos(): void {
    this.projServ.lista().subscribe(
      data => { this.proj = data; }
    )
  }

  onEditInit(idx?: number) {
    if (idx != undefined) {
      this.agregarProyecto = false;
      console.log(idx);
      this.projServ.details(idx).subscribe(datax => {
        this.projEdit = datax
      }, err => {
        alert("Error al modificar proyecto");
        this.router.navigate([''])
        window.location.reload();
      }
      )
    }
  }

  onUpdate(idx?: number) {
    this.projServ.update(idx, this.projEdit).subscribe(data => {
      alert("modificacion exitosa");
      this.router.navigate(['']);
      window.location.reload();
    }, err => {
      alert("Error al modificar proyecto");
      this.router.navigate([''])
      window.location.reload();
    })
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.projServ.delete(id).subscribe(data => {
        this.cargarProjectos();
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
    const pro = new Project(this.nombreProject, this.informacion);
    this.projServ.save(pro).subscribe(
      data => {
        alert("Proyecto añadido");
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
    this.agregarProyecto = !this.agregarProyecto;
  }

}
