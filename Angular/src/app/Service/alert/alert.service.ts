import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  error(error: any) {
    throw new Error('Method not implemented.');
  }

  private subject = new Subject<any>();

  success(message: string, options?: any) {
    this.subject.next({ type: 'success', text: message, options: options });
  }

  getAlert(): Subject<any> {
    return this.subject;
  }
}
