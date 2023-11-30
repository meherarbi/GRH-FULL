import { Component, OnInit } from '@angular/core';
import { TimeSheet } from 'src/app/Model/timesheet';
import { ProductService } from 'src/app/Service/product/product.service';
import { TimeSheetService } from 'src/app/Service/TimeSheet/timesheet.service';

@Component({
    selector: 'app-timesheet-list',
    templateUrl: './time-sheet-list.component.html'
})
export class TimeSheetListComponent implements OnInit {
    timeSheets: TimeSheet[] | any; // Utilisation d'un type plus strict

    constructor(private timeSheetService: TimeSheetService,
        private productService: ProductService) {}

    ngOnInit(): void {
        console.log('ngOnInit called');
        this.loadTimeSheets();
    }

    loadTimeSheets(): void {
        this.timeSheetService.getTimeSheets().subscribe({
            next: (data) => {
                this.timeSheets = data;
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
        // Logique pour éditer une feuille de temps
        // Cela pourrait impliquer de naviguer vers un formulaire de modification
        // Exemple: this.router.navigate(['/timesheet/edit', timesheet.id]);
    }

    deleteTimeSheet(id: number): void {
        this.timeSheetService.deleteTimeSheet(id).subscribe(
            () => {
                this.loadTimeSheets(); // Recharger la liste après la suppression
            },
            (error) => {
                console.error('Error deleting time sheet:', error);
            }
        );
    }
}
