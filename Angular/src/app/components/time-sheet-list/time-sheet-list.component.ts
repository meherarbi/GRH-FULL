import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeSheet } from 'src/app/Model/timesheet';
import { ProductService } from 'src/app/Service/product/product.service';
import { TimeSheetService } from 'src/app/Service/TimeSheet/timesheet.service';


@Component({
    selector: 'app-timesheet-list',
    templateUrl: './time-sheet-list.component.html',
    styleUrls: ['./time-sheet-list.component.css'],
})
export class TimeSheetListComponent implements OnInit {
    timeSheets: TimeSheet[] | any; // Utilisation d'un type plus strict
    currentPage: number = 1;
    totalItems: number = 0;
    itemsPerPage: number = 10; // Définir en fonction de votre préférence

    constructor(private timeSheetService: TimeSheetService,
        private productService: ProductService,
        private router: Router) {}

    ngOnInit(): void {
        console.log('ngOnInit called');
        this.loadTimeSheets(this.currentPage);
    }

    loadTimeSheets(page: number): void {
        this.timeSheetService.getTimeSheets(page, this.itemsPerPage).subscribe({
            next: (response) => {
                this.timeSheets = response.data;
                this.totalItems = response.totalItems;
                this.currentPage = response.currentPage;

                this.timeSheets.forEach((timesheet: any) => {
                    if (timesheet.product) {
                        this.productService.getProductByUrl(timesheet.product).subscribe(
                            (productDetails) => {
                                timesheet.productDetails = productDetails;
                            },
                            (error) => {
                                console.error('Erreur lors de la récupération des détails du produit', error);
                            }
                        );
                    }
                });
            },
            error: (error) => {
                console.error('Error loading time sheets:', error);
            }
        });
    }
    
    
    

    editTimeSheet(timesheet: TimeSheet): void {
        this.router.navigate(['timesheet/edit', timesheet.id]);
    }

    confirmDelete(id: number): void {
        const confirmed = window.confirm(
          `Are you sure you want to delete this project ?`
        );
    
        if (confirmed) {
          this.deleteTimeSheet(id);
        }
      }
    

    deleteTimeSheet(id: number): void {
        this.timeSheetService.deleteTimeSheet(id).subscribe(
            () => {
                this.loadTimeSheets(this.currentPage); // Recharger la liste après la suppression
            },
            (error) => {
                console.error('Error deleting time sheet:', error);
            }
        );
    }
}
