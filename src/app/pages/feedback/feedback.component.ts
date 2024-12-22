import {Component, inject} from '@angular/core';
import {DbService} from '../../servises/db.service';
import {CommonModule, JsonPipe, NgForOf} from '@angular/common';
import {NotificationsService} from '../../common-ui/popup/notifications.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf, CommonModule,
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  dbService = inject(DbService);
  notificationService = inject(NotificationsService);
  feedData: any[] = [];

  ngOnInit() {
    this.dbService.getFeedback().subscribe((data: any) => {
      this.feedData = data;
    }, (error) => {
      console.log(error);
    })  }

  feedClient(id:any){
    this.dbService.deleteFeedback(id).subscribe(
      data => {
        this.notificationService.showSuccess("Данные о клиенте удалены")
        // console.log('Данные удалены');
        this.dbService.getFeedback().subscribe((data: any) => {
          this.feedData = data;
        }, (error) => {
          console.log(error);
        })

      }, error => {
        console.log(error);
      }
    )
  }
}
