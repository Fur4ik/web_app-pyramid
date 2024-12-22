import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DbService} from '../../servises/db.service';
import {CommonModule} from '@angular/common';
import * as stream from 'node:stream';
import {NotificationsService} from '../../common-ui/popup/notifications.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  dbService = inject(DbService);
  notificationService = inject(NotificationsService);

  feedForm = new FormGroup({
    feedNameUser: new FormControl('', Validators.required),
    feedPhoneUser: new FormControl('', Validators.required),
  })

  sendFeedback() {
    const dataForm = {
      feedName: this.feedForm.get('feedNameUser')?.value,
      feedPhone: this.feedForm.get('feedPhoneUser')?.value,
    }
    console.log(dataForm);
    if (dataForm.feedName && dataForm.feedPhone) {
      this.dbService.postFeedback(dataForm.feedName, dataForm.feedPhone).subscribe({
        next: (result) => {
          // console.log('Обратная связь успешно отправлена: ', result);
          this.notificationService.showSuccess("Наш менеджер скоро свяжется с вами")
          this.feedForm.reset();
        },
        error: (err) => {
          // console.error('Ошибка при отправке обратной связи: ', err);
          this.notificationService.showFail("Произошла ошибка при отправке обратной связи")
        }
      })
    } else {
      console.error('Form is empty')
    }
  }

  showSuccessPopup(){
    this.notificationService.showSuccess("Наш менеджер скоро свяжется с вами")
  }
  showFailPopup(){
    this.notificationService.showFail("Произошла ошибка при отправке обратной связи")
  }

  // slides={
  //   url_photo: '',
  // };
  //
  // ngOnInit(){
  //   this.dbService.getSlider().subscribe(
  //     data => {
  //       this.slides=data;
  //     }
  //   )
  // }

  slides:string[]=[
    "./assets/img/slider1.jpg",
    "./assets/img/slider2.jpg",
    "./assets/img/slider3.jpg",
    "./assets/img/slider4.jpg",
  ];
  slideIndex: number = 1;

  nextSlide(){
    this.slideIndex = (this.slideIndex % this.slides.length) + 1;
  }

  previousSlide(){
    this.slideIndex = (this.slideIndex - 2 + this.slides.length)
      % this.slides.length + 1;
  }

  // correntSlide(n: number){
  //   if(n>=1 && n<=this.slides.length){
  //     this.slideIndex = n;
  //   }
  // }

}
