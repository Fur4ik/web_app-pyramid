import {Component, inject} from '@angular/core';
import {TrensessPageComponent} from '../trensess-page/trensess-page.component';
import {AdminScheduleDbComponent} from '../../admin/admin-schedule-db/admin-schedule-db.component';
import {AuthGuard} from '../../guards/auth.guard';
import {AuthService} from '../../servises/auth.service';
import {DbService} from '../../servises/db.service';
import {AsyncPipe, CommonModule, JsonPipe} from '@angular/common';
import {UserDataService} from '../../servises/user-data.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from '../../common-ui/header/header.component';
import {FeedbackComponent} from '../feedback/feedback.component';
import {NotificationsService} from '../../common-ui/popup/notifications.service';
import {TrenStateService} from '../../servises/tren-state.service';


@Component({
  selector: 'app-lk',
  standalone: true,
  imports: [
    TrensessPageComponent,
    AdminScheduleDbComponent,
    JsonPipe,
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    FeedbackComponent
  ],
  templateUrl: './lk.component.html',
  styleUrl: './lk.component.scss',
})
export class LkComponent {
  authService = inject(AuthService);
  dbService = inject(DbService);
  userData = inject(UserDataService)
  notificationsService = inject(NotificationsService);
  trenStateService = inject(TrenStateService)

  countTrener: number = 16;

  user: any;
  // dataUser: string | undefined;
  dataUser = {
    id_client: '',
    name_client: '',
    email_client: '',
    role_client: '',
  };

  lkForm = new FormGroup({
    nameForm: new FormControl('', [Validators.required, Validators.pattern('^[а-яА-ЯЁё]+\\s[а-яА-ЯЁё]+$')]),
    emailForm: new FormControl('', [Validators.required, Validators.email]),
  });

  onLogout(){
    this.authService.logout();
  }

  onCancel(){
    this.lkForm.reset();
  }

  onUpdateUser() {
    const newUserData = {
      newName: this.lkForm.get('nameForm')?.value,
      newEmail: this.lkForm.get('emailForm')?.value,
    }

    // Проверяем, что форма валидна
    if (!this.lkForm.invalid) {
      // Отправляем запрос на обновление только если данные изменились
      if (newUserData.newName !== this.dataUser.name_client ||
        newUserData.newEmail !== this.dataUser.email_client) {

        this.dbService.updateUser(this.dataUser.id_client,
          newUserData.newName, newUserData.newEmail).subscribe({
          next: (response) => {
            // console.log('Данные изменены', response);
            this.notificationsService.showSuccess("Данные успешно обновлены");
            this.authService.renameEmail(newUserData.newEmail);
            this.resetData();
            this.lkForm.reset(); // Сброс формы после успешного обновления
          },
          error: (err) => {
            console.error('Ошибка при изменении данных', err);
          }
        });
      } else {
        // console.log('Данные не изменились');
        this.notificationsService.showFail("Новые данные совпадают с предыдущими");
      }
    } else {
      console.log('Форма невалидна');
    }
  }





  ngOnInit() {
    this.resetData();

    this.authService.getData().subscribe(
      (response) => {
        this.dataUser = response[0];

        // Загружаем количество тренировок с сервера
        this.dbService.getCountTren(this.dataUser.id_client).subscribe(
          (response) => {
            this.trenStateService.setCount(response); // Устанавливаем начальное значение
          }
        );

        // Подписываемся на обновления количества тренировок
        this.trenStateService.countTren$.subscribe(
          (count) => {
            this.countTrener = 18 - count;
          }
        );
      },
      (error) => {
        console.error('Ошибка при получении данных:', error);
      }
    );

  }

  // ngOnInit() {
  //   this.resetData()
  //
  //
  //
  // }
  // sc
  resetData(){
    this.authService.getData().subscribe(
      (response) => {
        this.dataUser = response[0];
        // console.log('Component', this.dataUser);
        this.dbService.getCountTren(this.dataUser.id_client).subscribe(
          (response) => {
            this.countTrener -= response;
          }
        )
      },
      (error) => {
        console.error('Ошибка при получении данных:', error);
      }
    );
  }

}

