import { Component } from '@angular/core';
import { TimeSheet } from 'src/app/Model/timesheet';
import { TimeSheetService } from 'src/app/Service/TimeSheet/timesheet.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.css']
})
export class TimesheetFormComponent {

  timesheetForm: FormGroup;

    constructor(private fb: FormBuilder, private timesheetService: TimeSheetService , private router: Router) {
        this.timesheetForm = this.fb.group({
            date: [''],
            hoursWorked: [''],
            tasks: [''],
            comments: [''],
            status: ['']
        });
    }

    onSubmit(): void {
        this.timesheetService.createTimeSheet(this.timesheetForm.value).subscribe(
            (response) => {
                this.router.navigate(['/timesheet']); 
            },
            (error) => {
                
            }
        );
    }
}
