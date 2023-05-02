import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutProyectComponent } from './components/about-proyect/about-proyect.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'aboutProyect', component: AboutProyectComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
