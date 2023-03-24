import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/Model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Définition de l'URL de l'API et création d'une instance de JwtHelperService
  private apiURL = environment.apiURL;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

 /*  register(user: User): Observable<any> {
    return this.http.post(`${this.apiURL}/register`,  user) ;
  } */
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, { username, password });
  }

  // Fonction de connexion qui envoie une requête POST à l'API avec les identifiants de l'utilisateur
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, { username, password });
  }

  // Fonction de déconnexion qui supprime le token d'authentification stocké dans localStorage
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  // Fonction qui vérifie si l'utilisateur est authentifié en vérifiant la validité du token stocké dans localStorage
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
