import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit{

  expLab: Experiencia = null;

  constructor(private expServ: ExperienciaService, private activatedRouter: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.expServ.details(id).subscribe(data=>{
      this.expLab = data
    },err=>{
      alert("Error al modificar experiencia");
      this.router.navigate([''])
    }
    )
  }

  onUpdate() {
    const id = this.activatedRouter.snapshot.params['id'];
    this.expServ.update(id, this.expLab).subscribe(data => {
      this.router.navigate([''])
    },err=>{
      alert("Error al modificar experiencia");
      this.router.navigate([''])
    })
  }
}
