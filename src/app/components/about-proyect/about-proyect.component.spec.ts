import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutProyectComponent } from './about-proyect.component';

describe('AboutProyectComponent', () => {
  let component: AboutProyectComponent;
  let fixture: ComponentFixture<AboutProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutProyectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
