import { NgForOf } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DbService} from '../../servises/db.service';
import {AuthService} from '../../servises/auth.service';
import {debounceTime} from 'rxjs';
import {NotificationsService} from '../../common-ui/popup/notifications.service';

@Component({
  selector: 'app-schedule-page',
  standalone: true,
  imports: [NgForOf, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  providers: [DbService]
})

export class SchedulePageComponent{
  authService = inject(AuthService);
  dbService = inject( DbService);
  notificationService = inject(NotificationsService);

  searchForm = new FormGroup({
    searchTime: new FormControl(''),
    searchType: new FormControl(''),
    searchTren: new FormControl('')
  });


  trenSess: any[] = [];
  filteredTrenSess: any[] = [];

  constructor() {}


  dataUser = {
    id_client: '',
    name_client: '',
    email_client: '',
    role_client: '',
  };

  ngOnInit() {
    // Получаем данные пользователя
    this.authService.getData().subscribe(
      (response) => {
        this.dataUser = response[0];
      },
      (error) => {
        console.error('Ошибка при получении данных:', error);
      }
    );

    // Получаем данные тренировок
    this.dbService.getSchedule().subscribe(data => {
      this.trenSess = data;
      this.filteredTrenSess = [...this.trenSess]; // Изначально все тренировки
    });

    // Отслеживаем изменения в полях формы
    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.filterTren();
    });
  }

  // Метод для фильтрации тренировок
  filterTren() {
    const { searchTime, searchType, searchTren } = this.searchForm.value;

    this.filteredTrenSess = this.trenSess.filter(item =>
      (!searchTime || item.time_clock.includes(searchTime)) &&
      (!searchType || item.name_tren_sess.toLowerCase().includes(searchType.toLowerCase())) &&
      (!searchTren || item.name_trener.toLowerCase().includes(searchTren.toLowerCase()))
    );
  }
  countTren: number =0;
  postTren(item: any) {
    this.dbService.getCountTren(this.dataUser.id_client).subscribe(
      (response) => {
        this.countTren = response;
console.log(this.countTren);
        if (this.countTren > 1) {
          this.notificationService.showFail("Вы уже записаны на 2 тренировки");
        } else {
          this.dbService.postUserSchedule(this.dataUser.id_client, item.id_tren).subscribe(
            data => {
              this.notificationService.showSuccess(`Вы записались на ${item.name_tren_sess} в ${item.time_clock}`);
            },
            error => {
              this.notificationService.showFail(`${error.error.message}`);
            }
          );
        }
      },
      error => {
        console.error("Ошибка при получении количества тренировок:", error);
      }
    );
  }

}

