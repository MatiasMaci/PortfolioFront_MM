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
      this.skillServ.details(idx).subscribe(datax => {
        this.skillEdit = datax
      }, err => {
        alert("Error al modificar educacion");
        this.router.navigate([''])
      }
      )
    }
  }

  onUpdate(idx?: number) {
    this.skillServ.update(idx, this.skillEdit).subscribe(data => {
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
    this.skillServ.lista().subscribe(
      data => { this.ski = data; }
    )
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.skillServ.delete(id).subscribe(data => {
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
    const skix = new Skills(this.nombreSkill, this.percent);
    this.skillServ.save(skix).subscribe(
      data => {
        alert("Educacion añadida");
        this.router.navigate(['']);
      }, err => {
        alert("Fallo");
        this.router.navigate(['']);
      }
    )
  }

  onClick() {
    this.agregarCurso = !this.agregarCurso;
  }

}