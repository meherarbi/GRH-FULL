import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Leave } from 'src/app/Model/leave';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css'],
})
export class LeaveFormComponent {
  users: any[] = [];
  selectedUserId: string = '';
  startDate: any;
  endDate: any;
  type: any;
  comment: any;
  firstName = '';

  constructor(private http: HttpClient , private router: Router) {
    this.http
      .get<any[]>('https://localhost:8000/api/users')
      .subscribe((response) => {
        this.users = response;
      });
  }

  onSubmit() {
    const data = {
      // userId: Number(this.selectedUserId), // Si nécessaire
      startDate: this.startDate,
      endDate: this.endDate,
      type: this.type,
      comment: this.comment,
    };
  
    this.http.post('https://localhost:8000/api/create', data).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/leave']);
      },
      (error) => {
        console.error('Erreur lors de lenvoi des données', error);
      }
    );
  }
  
  
}
