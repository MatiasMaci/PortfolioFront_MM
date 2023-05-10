import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { About } from 'src/app/model/about';
import { Persona } from 'src/app/model/persona';
import { AboutService } from 'src/app/service/about.service';
import { ImagenService } from 'src/app/service/imagen.service';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-banner-info',
  templateUrl: './banner-info.component.html',
  styleUrls: ['./banner-info.component.css']
})
export class BannerInfoComponent implements OnInit {

  persEdit: Persona = new Persona("","","");
  pers: Persona[] = [];
  aboutEdit: About = new About("","","",0);
  about: About[] = [];

  constructor(public persServ: PersonaService, private aboutServ: AboutService, private tokenServ: TokenService, private router: Router, public imgServ: ImagenService) {
  }

  editarAbout = false;
  editarPers = false;
  isLogged = false;
  loadingImage = false;

  ngOnInit() {
    //this.persServ.getPersonas().subscribe(data => { console.log(data); this.persona = data; });
    this.cargarPersona();
    this.cargarAbout();
    if (this.tokenServ.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarPersona() {
    this.persServ.details(1).subscribe(
      data => { this.persEdit = data; console.log(data); }
    )
  }

  cargarAbout() {
    this.aboutServ.details(1).subscribe(
      data => { this.aboutEdit = data; console.log(data); }
    )
  }

  onUpdatePersona(idx?: number) {
    this.persEdit.imagen = this.imgServ.url;
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

  onUpdateAbout(idx?: number) {
    this.aboutServ.update(idx, this.aboutEdit).subscribe(data => {
      alert("modificacion exitosa");
      this.router.navigate(['']);
      window.location.reload();
    }, err => {
      alert("Error al modificar persona");
      this.router.navigate([''])
      window.location.reload();
    })
  }

  onEditInitPers() {
    this.editarPers = !this.editarPers;
      this.persServ.details(1).subscribe(datax => {
        this.persEdit = datax; console.log(datax);
      }, err => {
        alert("Error al modificar persona");
        this.router.navigate([''])
      }
      )
  }

  onEditInitAbout() {
    this.editarAbout = !this.editarAbout;
    this.aboutServ.details(1).subscribe(datax => {
      this.aboutEdit = datax; console.log(datax);
    }, err => {
      alert("Error al modificar informacion");
      this.router.navigate([''])
    }
    )
  }

  loading() {
    this.loadingImage = true;
  }

  uploadImage($event: any) {
    const id = 1;
    const name = 'perfil' + id;
    this.imgServ.uploadImage($event, name);
    this.loadingImage = false;
  }
}
