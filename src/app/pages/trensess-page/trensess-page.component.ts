import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DbService } from '../../servises/db.service';
import { AuthService } from '../../servises/auth.service';
import { debounceTime } from 'rxjs/operators';
import {NotificationsService} from '../../common-ui/popup/notifications.service';
import {TrenStateService} from '../../servises/tren-state.service';

interface Training {
  id_tren: string;
  time_clock: string;
  time_min: number;
  zone: string;
  name_tren_sess: string;
  name_trener: string;
}

@Component({
  selector: 'app-trensess-page',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './trensess-page.component.html',
  styleUrls: ['./trensess-page.component.scss']
})
export class TrensessPageComponent implements OnInit {
  authService = inject(AuthService);
  dbService = inject(DbService);
  notificationService = inject(NotificationsService);
  trenStateService = inject(TrenStateService);

  // Массивы с типами Training
  trenSess: Training[][] = [];
  filteredTrenSess: Training[][] = [];

  // Форма для поиска
  searchForm = new FormGroup({
    searchTime: new FormControl(''),
    searchType: new FormControl(''),
    searchTren: new FormControl('')
  });

  dataUser = {
    id_client: '',
    name_client: '',
    email_client: '',
    role_client: '',
  };

  constructor() {}

  ngOnInit() {
    this.fetchUserData();

    // Отслеживание изменений в форме поиска
    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.filterTren();
    });
  }

  fetchUserData() {
    this.authService.getData().subscribe(
      (response) => {
        this.dataUser = response[0];

        this.dbService.getUserSchedule(this.dataUser.id_client).subscribe(
          data => {
            const trenData = data;
            this.trenSess = [];

            // Получаем данные для каждой тренировки
            trenData.forEach((tren: { id_tren: string }) => {
              const id_tren = tren.id_tren;

              this.dbService.getScheduleId(id_tren).subscribe(
                (scheduleData: Training[]) => {
                  this.trenSess.push(scheduleData);
                  this.filteredTrenSess = [...this.trenSess];
                },
                error => {
                  console.error('Ошибка при получении данных расписания:', error);
                }
              );
            });
          },
          error => {
            console.error('Ошибка при получении расписания пользователя:', error);
          }
        );
      },
      (error) => {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    );
  }

  // Метод для фильтрации данных
  filterTren() {
    const { searchTime, searchType, searchTren } = this.searchForm.value;

    this.filteredTrenSess = this.trenSess.map(subArray =>
      subArray.filter((item: Training) =>
        (!searchTime || item.time_clock.includes(searchTime)) &&
        (!searchType || item.name_tren_sess.toLowerCase().includes(searchType.toLowerCase())) &&
        (!searchTren || item.name_trener.toLowerCase().includes(searchTren.toLowerCase()))
      )
    );
  }

  // Метод для удаления тренировки
  // Метод для удаления тренировки
  onDeleteTren(item: any) {
    this.dbService.deleteTrenSchedule(this.dataUser.id_client, item.id_tren).subscribe(
      () => {
        // Удаляем тренировку из массивов
        this.trenSess = this.trenSess.map(subArray =>
          subArray.filter(trenItem => trenItem.id_tren !== item.id_tren)
        ).filter(subArray => subArray.length > 0);

        this.filteredTrenSess = this.filteredTrenSess.map(subArray =>
          subArray.filter(trenItem => trenItem.id_tren !== item.id_tren)
        ).filter(subArray => subArray.length > 0);

        // Уменьшаем количество тренировок через сервис
        this.trenStateService.decrementCount();

        this.notificationService.showSuccess(
          `Вы отменили запись на ${item.name_tren_sess} в ${item.time_clock}`
        );
      },
      (error) => {
        console.error('Ошибка при удалении тренировки:', error);
      }
    );
  }

}
