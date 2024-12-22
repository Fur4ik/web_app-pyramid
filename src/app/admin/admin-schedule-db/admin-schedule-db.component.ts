import {Component, inject} from '@angular/core';
import {Router} from 'express';
import {DbService} from '../../servises/db.service';
import {CommonModule, NgForOf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NotificationsService} from '../../common-ui/popup/notifications.service';

@Component({
  selector: 'app-admin-schedule-db',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './admin-schedule-db.component.html',
  styleUrl: './admin-schedule-db.component.scss',
  providers: [DbService]
})
export class AdminScheduleDbComponent {
  notificationService = inject(NotificationsService);
  dbServise = inject(DbService);

  public postForm=new FormGroup({
    postTimeClock: new FormControl('', [Validators.required,Validators.pattern('^([0-1][0-9]|2[0-3]):[0-5][0-9]$')]),
    postTimeMin: new FormControl('',[Validators.required,Validators.pattern('^([0-9][0-9]|1[0-9][0-9])$')]),
    postZone: new FormControl('', [Validators.required,Validators.pattern('^[а-яА-ЯЁё]+(\\s[а-яА-ЯЁё]+)*$')]),
    postNameTrenSess: new FormControl('', [Validators.required,Validators.pattern('^[а-яА-ЯЁёa-zA-Z]+(\\s[а-яА-ЯЁёa-zA-Z]+)*$')]),
    postNameTren: new FormControl('', [Validators.required,Validators.pattern('^[а-яА-ЯЁё]+\\s[а-яА-ЯЁё]+$')]),
  })

  public trenSess:any[]=[];

  //выгрузка из бд
  ngOnInit() {
    this.dbServise.getSchedule().subscribe(
      data => {
        this.trenSess = data;
        console.log(this.trenSess);
      }
    )
  }

  //создание новой записи в таблитцу бд
  onSubmit() {
    const scheduleData = {
      time_clock: this.postForm.get('postTimeClock')?.value,
      time_min: this.postForm.get('postTimeMin')?.value,
      zone: this.postForm.get('postZone')?.value,
      name_tren_sess: this.postForm.get('postNameTrenSess')?.value,
      name_trener: this.postForm.get('postNameTren')?.value
    };

    this.dbServise.postSchedule(scheduleData).subscribe(
      data => {
        // console.log('Данные успешно отправлены:', scheduleData);
        this.notificationService.showSuccess(`Тренировка ${scheduleData.name_tren_sess} успешно добавлена`)
        this.postForm.reset();
        this.dbServise.getSchedule().subscribe(updatedData => {
          this.trenSess = updatedData;
        });
      },
      error => {
        console.error('Ошибка при отправке данных:', error);
      }
    );
  }

  //удаление записи из таблицы бд
  deleteTren(item:any) {
    this.dbServise.deleteSchedule(item.id_tren).subscribe(
      data=>{
        // console.log('Данные успешно удалены');
        this.notificationService.showSuccess(`Тренировка ${item.name_tren_sess} в ${item.time_clock} успешно удалена`)
        this.dbServise.getSchedule().subscribe(updatedData => {
          this.trenSess = updatedData;
        })
      },
      error => {
        console.error('Ошибка при отправке данных:', error);
      }
    )
  }
}
