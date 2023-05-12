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
  idBoton: number = 0;

  isEditing = false;
  isLogged = false;
  agregarLogro = false;

  ngOnInit(): void {
    this.cargarLogros();
    this.isEditing = false;
    this.agregarLogro = false;
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
      if (idx != this.idBoton) {
        this.isEditing = true;
        this.idBoton = idx;
        console.log(idx);
        this.achiServ.details(idx).subscribe(datax => {
          this.achiEdit = datax
        }, err => {
          alert("Error al modificar logros");
          this.router.navigate([''])
          this.ngOnInit();
          //window.location.reload();
        }
        )
      } else {
        this.isEditing = !this.isEditing;
      }
    }
  }

  onUpdate(idx?: number) {
    this.achiServ.update(idx, this.achiEdit).subscribe(data => {
      alert("modificacion exitosa");
      this.router.navigate(['']);
      this.ngOnInit();
    }, err => {
      alert("Error al modificar logro");
      this.router.navigate([''])
    })
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.achiServ.delete(id).subscribe(data => {
        this.cargarLogros();
        alert("Se elimino correctamente");
        this.ngOnInit();
      }, err => {
        alert("No se pudo eliminar");
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
        this.ngOnInit();
      }, err => {
        alert("Fallo");
        this.router.navigate(['']);
      }
    )
  }

  onClick() {
    this.agregarLogro = !this.agregarLogro;
    this.achiEdit = new Achievement('');
    this.isEditing = false;
  }

}