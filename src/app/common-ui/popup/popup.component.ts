import {Component, inject} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {NotificationsService} from './notifications.service';

interface Notification {
  type: 'success' | 'fail';
  message: string;
}

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  notificationsService = inject(NotificationsService);
  notifications: Notification[]=[];

  ngOnInit() {
    this.notificationsService.notifications$.subscribe((data: any) => {
      this.notifications.push(data);

      setTimeout(()=>{
        this.notifications.shift()}, 4000
      )
    })
  }



}
