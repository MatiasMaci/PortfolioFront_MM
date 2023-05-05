import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  IsLogged = false;

  constructor(private router: Router, private tokenService: TokenService){}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.IsLogged = true;
    } else {
      this.IsLogged = false;
    }
  }

  onLogOut():void {
    this.tokenService.logOut();
    window.location.reload();
}

  SingIn() {
    this.router.navigate(['/login']);
  }

}
