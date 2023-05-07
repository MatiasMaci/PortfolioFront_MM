import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/model/persona';
import { ImagenService } from 'src/app/service/imagen.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-banner-info',
  templateUrl: './banner-info.component.html',
  styleUrls: ['./banner-info.component.css']
})
export class BannerInfoComponent implements OnInit {

  persEdit: Persona = null;
  pers: Persona[] = [];

  constructor(public persServ: PersonaService, private tokenServ: TokenService, private router: Router, private imgServ: ImagenService) {
  }

  editar = false;
  isLogged = false;

  ngOnInit() {
    //this.persServ.getPersonas().subscribe(data => { console.log(data); this.persona = data; });
    this.cargarPersona();
    if (this.tokenServ.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarPersona() {
    this.persServ.details(3).subscribe(
      data => { this.persEdit = data; console.log(data); }
    )
  }

  onUpdate(idx?: number) {
    //this.persEdit.imagen = this.imgServ.url;
    this.persServ.update(idx, this.persEdit).subscribe(data => {
      alert("modificacion exitosa");
      this.router.navigate(['']);
      window.location.reload();
    }, err => {
      alert("Error al modificar persona");
      this.router.navigate([''])
      window.location.reload();
    })
  }

  onEditInit() {
    this.editar = !this.editar;
      this.persServ.details(3).subscribe(datax => {
        this.persEdit = datax; console.log(datax);
      }, err => {
        alert("Error al modificar educacion");
        this.router.navigate([''])
      }
      )
  }
  uploadImage($event: any) {
    const id = 3;
    const name = 'perfil' + id;
    this.imgServ.uploadImage($event, name);
  }
}
