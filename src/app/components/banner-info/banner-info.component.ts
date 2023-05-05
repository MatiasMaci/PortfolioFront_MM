import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-banner-info',
  templateUrl: './banner-info.component.html',
  styleUrls: ['./banner-info.component.css']
})
export class BannerInfoComponent implements OnInit {

  persona: Persona = new Persona("","","");

  constructor(public personaService: PersonaService) {
  }

  ngOnInit() {
    this.personaService.getPersonas().subscribe(data => { console.log(data); this.persona = data; });
  }

}
