import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/Model/product';
import { TimeSheetService } from 'src/app/Service/TimeSheet/timesheet.service';
import { ProductService } from 'src/app/Service/product/product.service';
import { TimeSheet } from 'src/app/Model/timesheet';


@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.css']
})
export class EditTimesheetComponent implements OnInit {
  timesheetForm!: FormGroup;
  timesheet: any;
  products: Product[] | undefined ;

  constructor(
    private route: ActivatedRoute,
    private timeSheetService: TimeSheetService,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
        this.timeSheetService.getTimeSheetById(id).subscribe(
            (data) => {
                this.timesheet = data;
                this.initializeForm();
            }
        );

        // Charger la liste des produits
        this.productService.getProducts().subscribe(
            (products) => this.products = products
        );
  }

  initializeForm(): void {
    this.timesheetForm = this.fb.group({
        date: [this.timesheet.date, Validators.required],
        product: [this.timesheet.product?.id, Validators.required],
        hoursWorked: [this.timesheet.hoursWorked, Validators.required],
        tasks: [this.timesheet.tasks, Validators.required],
        comments: [this.timesheet.comments],
        status: [this.timesheet.status, Validators.required]
    });
}


onSubmit(): void {
  if (this.timesheetForm.valid) {
      const updatedTimeSheet = {
          ...this.timesheet,
          ...this.timesheetForm.value
      };

      this.timeSheetService.updateTimeSheet(updatedTimeSheet).subscribe(
          () => this.router.navigate(['/timesheets']),
          (error) => console.error('Error updating timesheet:', error)
      );
  }
}

}
