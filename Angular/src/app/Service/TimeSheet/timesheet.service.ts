

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PaginatedResponse, TimeSheet } from 'src/app/Model/timesheet';



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
    getTimeSheets(page: number, limit: number): Observable<PaginatedResponse<TimeSheet>> {
        return this.http.get<PaginatedResponse<TimeSheet>>(`${this.apiUrl}/list?page=${page}&limit=${limit}`);
    }

    
    
    

    updateTimeSheet(timesheet: TimeSheet): Observable<TimeSheet> {
        return this.http.put<TimeSheet>(`${this.apiUrl}/edit/${timesheet.id}`, timesheet);
    }

    getTimeSheetById(id: number): Observable<TimeSheet> {
        return this.http.get<TimeSheet>(`${this.apiUrl}/${id}`);
    }
    

    deleteTimeSheet(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }

    
}
