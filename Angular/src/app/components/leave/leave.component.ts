import { Component } from '@angular/core';
import { LeaveService } from 'src/app/Service/leave/leave.service';
import { UserService } from 'src/app/Service/user/user.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {
  leaves: any;

  constructor(private leaveService: LeaveService , private UserService: UserService) { }

  ngOnInit(): void {
    this.leaveService.getLeaves().subscribe(
      (response: any) => {
        this.leaves = response.leave;
        console.log(this.leaves); // Pour inspecter les données reçues
  
        this.leaves.forEach((leave: any) => {
          if (leave.user) {
            this.UserService.getUserByUrl(leave.user).subscribe(
              (userDetails) => {
                leave.userDetails = userDetails; // Stockez les détails de l'utilisateur dans l'objet leave
              },
              (error) => {
                console.error('Erreur lors de la récupération des détails de lutilisateur', error);
              }
            );
          }
        });
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des congés', error);
      }
    );
  }
  
}
