import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutProyectComponent } from './components/about-proyect/about-proyect.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'aboutProyect', component: AboutProyectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
