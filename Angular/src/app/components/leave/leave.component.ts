import { Component } from '@angular/core';
import { LeaveService } from 'src/app/Service/leave/leave.service';
import { UserService } from 'src/app/Service/user/user.service';
import { Leave } from 'src/app/Model/leave';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {
  leaves: any;
// Dans votre classe LeaveComponent
currentPage = 1;
totalItems = 0;
itemsPerPage = 10;

  constructor(private leaveService: LeaveService , private UserService: UserService) { }
  ngOnInit(): void {
    this.loadLeaves(this.currentPage);
  }
  


  confirmDelete(id: number): void {
    const confirmed = window.confirm(`Are you sure you want to delete this leave ?`);
    if (confirmed) {
      this.deleteLeave(id); // Ici, passez 'id' directement
    }
  }
  
  


  deleteLeave(id: number): void {
    this.leaveService.deleteLeave(id).subscribe(
      () => {
        this.leaves = this.leaves?.filter((leave: { id: number; }) => leave.id !== id) ?? [];
        console.log(`Deleted leave with ID ${id}`);
      },
      (error) => console.error(error)
    );
  }

 // Dans LeaveComponent

loadLeaves(page: number = this.currentPage): void {
  this.leaveService.getLeaves(page, this.itemsPerPage).subscribe(data => {
    if (data && Array.isArray(data.leaves)) {
      this.leaves = data.leaves;
      this.totalItems = data.total;
      this.currentPage = page;

      this.leaves.forEach((leave: any) => {
        if (leave.user) {
          this.UserService.getUserByUrl(leave.user).subscribe(
            (userDetails) => {
              leave.userDetails = userDetails;
            },
            (error) => {
              console.error('Erreur lors de la récupération des détails de lutilisateur', error);
            }
          );
        }
      });
    } else {
      console.error('Invalid data format:', data);
    }
  }, error => {
    console.error('Error loading leaves:', error);
  });
}

  
}