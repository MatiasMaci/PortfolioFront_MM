import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Achievement } from 'src/app/model/achievement';
import { AchievementService } from 'src/app/service/achievement.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {

  achiEdit: Achievement = null;
  achi: Achievement[] = [];
  constructor(private achiServ: AchievementService, private tokenServ: TokenService,
    private router: Router) {
  }

  informacion: string = '';

  isEditing = false;
  isLogged = false;
  agregarLogro = false;

  ngOnInit(): void {
    this.cargarLogros();
    if (this.tokenServ.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarLogros(): void {
    this.achiServ.lista().subscribe(
      data => { this.achi = data; }
    )
  }

  onEditInit(idx?: number) {
    if (idx != undefined) {
      this.agregarLogro = false;
      console.log(idx);
      this.achiServ.details(idx).subscribe(datax => {
        this.achiEdit = datax
      }, err => {
        alert("Error al modificar logros");
        this.router.navigate([''])
        window.location.reload();
      }
      )
    }
  }

  onUpdate(idx?: number) {
    this.achiServ.update(idx, this.achiEdit).subscribe(data => {
      alert("modificacion exitosa");
      this.router.navigate(['']);
      window.location.reload();
    }, err => {
      alert("Error al modificar logro");
      this.router.navigate([''])
      window.location.reload();
    })
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.achiServ.delete(id).subscribe(data => {
        this.cargarLogros();
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
    const achie = new Achievement(this.informacion);
    this.achiServ.save(achie).subscribe(
      data => {
        alert("Logro añadido");
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
    this.agregarLogro = !this.agregarLogro;
  }

}