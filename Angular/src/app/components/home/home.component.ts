
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './../../Service/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string | undefined;

  constructor(public authService: AuthService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (this.authService.isAuthenticated() && token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.username = decodedToken.username;
    }
  }
 

}
