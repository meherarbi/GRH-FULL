// src/app/components/time-sheet-list/time-sheet-list.component.ts

import { Component, OnInit } from '@angular/core';
import { TimeSheet } from 'src/app/Model/timesheet';
import { TimeSheetService } from 'src/app/Service/TimeSheet/timesheet.service';


@Component({
    selector: 'app-timesheet-list',
    templateUrl: './time-sheet-list.component.html'
})
export class TimeSheetListComponent implements OnInit {
    timeSheets: TimeSheet[] | any;

    constructor(private timeSheetService: TimeSheetService) {}

    ngOnInit(): void {
        this.loadTimeSheets();
    }

    loadTimeSheets(): void {
        this.timeSheetService.getTimeSheets().subscribe(
            (data) => {
                console.log('TimeSheets received:', data);
                this.timeSheets = data;
            },
            (error) => {
                console.error('Error loading time sheets:', error);
            }
        );
    }
    

    editTimeSheet(timesheet: TimeSheet): void {
        // Logique pour éditer une feuille de temps
        // Cela pourrait impliquer de naviguer vers un formulaire de modification
    }

    deleteTimeSheet(id: number): void {
        this.timeSheetService.deleteTimeSheet(id).subscribe(
            () => {
                // Après la suppression, rechargez ou mettez à jour la liste
                this.loadTimeSheets();
            },
            (error) => {
                // Gérer l'erreur
            }
        );
    }
}
