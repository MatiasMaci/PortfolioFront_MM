import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skills } from 'src/app/model/skills';
import { SkillsService } from 'src/app/service/skills.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skillEdit: Skills = null;
  ski: Skills[] = [];

  constructor(private skillServ: SkillsService, private tokenServ: TokenService,
    private router: Router) {
  }

  nombreSkill: string = '';
  percent: number = 0;
  idBoton: number = 0;

  isEditing = false;
  isLogged = false;
  agregarCurso = false;

  ngOnInit(): void {
    this.cargarEducation();
    this.isEditing = false;
    this.agregarCurso = false;
    if (this.tokenServ.getToken()) {
      this.isLogged = true;
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
        this.skillServ.details(idx).subscribe(datax => {
          this.skillEdit = datax
        }, err => {
          alert("Error al modificar habilidad");
          this.router.navigate([''])
          this.ngOnInit();
        }
        )
      } else {
        this.isEditing = !this.isEditing;
      }
    }
  }

  onUpdate(idx?: number) {
    if (this.skillEdit.percent <= 100 && this.skillEdit.percent >= 1) {
    this.skillServ.update(idx, this.skillEdit).subscribe(data => {
      alert("modificacion exitosa");
      this.router.navigate(['']);
      this.ngOnInit();
    }, err => {
      alert("Error al modificar habilidad");
      this.router.navigate([''])
    })
    }
    else {
      alert("Error en el porcentaje");
    }
  }

  cargarEducation(): void {
    this.skillServ.lista().subscribe(
      data => { this.ski = data; }
    )
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.skillServ.delete(id).subscribe(data => {
        this.cargarEducation();
        alert("Se elimino correctamente");
        this.ngOnInit();
      }, err => {
        alert("No se pudo eliminar");
      }
      )
    }
  }

  onCreate() {
    if (this.percent <= 100 && this.percent >= 1) {
      const skix = new Skills(this.nombreSkill, this.percent);
      this.skillServ.save(skix).subscribe(
        data => {
          alert("Habilidad añadida");
          this.router.navigate(['']);
          this.ngOnInit();
        }, err => {
          alert("Fallo");
          this.router.navigate(['']);
        }
      )
    }
    else {
      alert("Error en el porcentaje");
    }
  }

  onClick() {
    this.isEditing = false;
    this.skillEdit = new Skills('', 0)
    this.agregarCurso = !this.agregarCurso;
  }

}