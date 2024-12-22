import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

interface Notification {
  type: 'success' | 'fail';
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

  showSuccess(message: string) {
    this.notificationSubject.next({ type: 'success', message });
  }

  showFail(message: string) {
    this.notificationSubject.next({ type: 'fail', message });
  }
}
