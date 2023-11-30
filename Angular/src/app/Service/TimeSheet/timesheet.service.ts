

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TimeSheet } from 'src/app/Model/timesheet';



@Injectable({ providedIn: 'root' })
export class TimeSheetService {
    private apiUrl = 'https://localhost:8000/api/timesheet'; 

    constructor(private http: HttpClient) {}

    createTimeSheet(timesheet: TimeSheet): Observable<TimeSheet> {
        return this.http.post<TimeSheet>(this.apiUrl, timesheet);
    }

    /* getTimeSheets(): Observable<TimeSheet[]> {
        return this.http.get<TimeSheet[]>(`${this.apiUrl}/list`);
    } */
    getTimeSheets(): Observable<TimeSheet[]> {
        return this.http.get<TimeSheet[]>(`${this.apiUrl}/list`).pipe(
            tap(data => console.log('Datas from API:', data))
        );
    }
    

    updateTimeSheet(timesheet: TimeSheet): Observable<TimeSheet> {
        return this.http.put<TimeSheet>(`${this.apiUrl}/edit/${timesheet.id}`, timesheet);
    }

    deleteTimeSheet(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
}
