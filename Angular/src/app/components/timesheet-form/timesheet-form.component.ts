import { Component } from '@angular/core';
import { TimeSheet } from 'src/app/Model/timesheet';
import { TimeSheetService } from 'src/app/Service/TimeSheet/timesheet.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ProductService } from 'src/app/Service/product/product.service';

@Component({
  selector: 'app-timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.css']
})
export class TimesheetFormComponent {

  timesheetForm: FormGroup;
  products: Product[] = [];
    constructor(private productService: ProductService,private fb: FormBuilder, private timesheetService: TimeSheetService , private router: Router) {

        this.productService.getProducts().subscribe((data: Product[]) => {
            console.log("Produits reçus:", data);
            this.products = data;
        });

        this.timesheetForm = this.fb.group({
            date: [''],
            hoursWorked: [''],
            tasks: [''],
            comments: [''],
            status: [''],
            product: ['']
        });
        
    }

    onSubmit(): void {
        let timesheetData = this.timesheetForm.value;
    
        // Assurez-vous de ne pas ajouter à nouveau le chemin si déjà présent
        if (timesheetData.product && !timesheetData.product.startsWith('/api/products/')) {
            timesheetData.product = `/api/products/${timesheetData.product}`;
        }
    
        this.timesheetService.createTimeSheet(timesheetData).subscribe(
            (response) => {
                this.router.navigate(['/timesheet']);
            },
            (error) => {
                console.error('Erreur lors de la création du timesheet', error);
            }
        );
    }
    
    
}
