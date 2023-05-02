import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerInfoComponent } from './components/banner-info/banner-info.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfessionalExperienceComponent } from './components/professional-experience/professional-experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { TrainingComponent } from './components/training/training.component';
import { AboutProyectComponent } from './components/about-proyect/about-proyect.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerInfoComponent,
    HeaderComponent,
    ProfessionalExperienceComponent,
    SkillsComponent,
    TrainingComponent,
    AboutProyectComponent,
    AchievementsComponent,
    ProyectsComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
