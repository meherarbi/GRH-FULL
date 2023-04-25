import { Component } from '@angular/core';
import { LeaveService } from 'src/app/Service/leave/leave.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {
  leaves: any;

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.leaveService.getLeaves().subscribe(
      (response: any) => {
        this.leaves = response.leave;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
