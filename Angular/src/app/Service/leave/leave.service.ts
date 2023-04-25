import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leave } from 'src/app/Model/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  baseUrl = 'https://localhost:8000/api';

  constructor(private http: HttpClient) { }

   getLeaves(page: number = 1, limit: number = 500): Observable<any> {
    const url = `${this.baseUrl}/leave?page=${page}&limit=${limit}`;
    return this.http.get<any>(url);
  }
  addLeave(selectedUserId: string, startDate: string, endDate: string, type: string, comment: string): Observable<any> {
    const url = `${this.baseUrl}/create`;
    const data = {
      userId: selectedUserId, 
      startDate: startDate,
      endDate: endDate,
      type: type,
      comment: comment
    };
    return this.http.post(url, data);
}


  createLeave(userId: number, startDate: string, endDate: string, type: string, comment: string): Observable<any> {
    const url = `${this.baseUrl}/create`;
    const data = {
      id: userId,
      startDate: startDate,
      endDate: endDate,
      type: type,
      comment: comment
    };
    return this.http.post(url, data);
  }

  updateLeave(id: number, userId: number, startDate: string, endDate: string, comment: string): Observable<any> {
    const url = `${this.baseUrl}/leave/${id}`;
    const data = {
      userId: userId,
      startDate: startDate,
      endDate: endDate,
      comment: comment
    };
    return this.http.put(url, data);
  }

  deleteLeave(id: number): Observable<any> {
    const url = `${this.baseUrl}/leave/${id}`;
    return this.http.delete(url);
  }
}
