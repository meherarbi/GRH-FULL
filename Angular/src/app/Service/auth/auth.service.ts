import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/Model/user';
import { UserService } from '../user/user.service';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Définition de l'URL de l'API et création d'une instance de JwtHelperService
  private apiURL = environment.apiURL;
  private jwtHelper = new JwtHelperService();
  private userId: number | undefined;
  
  currentUser: User | undefined ; // Donner une valeur initiale à la propriété

 

  constructor(private http: HttpClient, private router: Router , private userService: UserService) {}

 /*  register(user: User): Observable<any> {
    return this.http.post(`${this.apiURL}/register`,  user) ;
  } */
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, { username, password });
  }

  public setUserId(id: number) {
    this.userId = id;
  }

  public getUserId(): number | undefined {
    return this.userId;
  }


  
  // Fonction de connexion qui envoie une requête POST à l'API avec les identifiants de l'utilisateur
  login(id:number,username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, { id,username, password });
    console.log(id)
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

   // Méthode qui récupère l'ID de l'utilisateur à partir du token JWT
   public getUserID(): string | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken.sub)
      return decodedToken.sub;
      
    } else {
      return null;
    }
  }

 // Fonction qui récupère l'utilisateur actuellement connecté à partir du token JWT
 getCurrentUser(): Observable<number> {
  const token = localStorage.getItem('access_token');
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const userId = decodedToken.sub;
    return of(userId);
  } else {
    return EMPTY;
  }
}

getIdFromToken(): number | undefined {
  const token = localStorage.getItem('token');
  if (!token) {
    return undefined;
  }
  const decoded: any = jwt_decode(token);
  return decoded.id;
}


  
  
  public getUserEmail(): string | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.username;
    } else {
      return null;
    }
  }
}
function jwt_decode(token: string | null): any {
  throw new Error('Function not implemented.');
}



