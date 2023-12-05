import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/Model/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users`);
  }
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/users?email=${email}`);
  }
  getUserById(id: number): Observable<number> {
    const url = `${this.apiURL}/users/${id}`;
    return this.http.get<User>(url).pipe(
      map((user: User) => user.id)
    );
  }

  /* getUserById(id: number): Observable<number> {
    const url = `${this.apiURL}/users/${id}`;
    return new Observable<number>(subscriber => {
      this.http.get<User>(url).subscribe({
        next: (user) => {
          subscriber.next(user.id);
        },
        error: (err) => {
          subscriber.error(err);
        },
        complete: () => {
          subscriber.complete();
        }
      });
    });
  }
   */

  getCurrentUser(id: number): Observable<any> {
    const url = `${this.apiURL}/users/${id}`;
    console.log(this.http.get(url));
    return this.http.get(url);
   
  }
  
  getUserByUrl(url: string): Observable<any> {
    return this.http.get(`https://localhost:8000${url}`);
  }
  
}
