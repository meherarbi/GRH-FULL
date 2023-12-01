import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Leave } from 'src/app/Model/leave';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css'],
})
export class LeaveFormComponent {
  leaveForm: FormGroup;
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.http.get<any[]>('https://localhost:8000/api/users')
      .subscribe(response => { this.users = response; });

    this.leaveForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      comment: new FormControl(''), // Pas requis
    });
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      this.http.post('https://localhost:8000/api/create', this.leaveForm.value)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/leave']);
          },
          error => {
            console.error('Erreur lors de l\'envoi des données', error);
          }
        );
    }
  }
}
