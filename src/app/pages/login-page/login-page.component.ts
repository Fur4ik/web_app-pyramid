import {Component, ElementRef, inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {CommonModule, NgForOf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DbService} from '../../servises/db.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../servises/auth.service';
import { Router } from '@angular/router';
import {NotificationsService} from '../../common-ui/popup/notifications.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [DbService, AuthService]

})
export class LoginPageComponent {
  notificationService = inject(NotificationsService);

  router = inject(Router);
  isToggled: boolean = false;
  loginError: string | null = null;
  regError: string | null = null;

  // Форма входа
  loginForm = new FormGroup({
    emailLogin: new FormControl('', [Validators.required]),
    passwordLogin: new FormControl('', [Validators.required])
  });

  // Форма регистрации
  regForm: FormGroup;

  authService = inject(AuthService);

  constructor(private fb: FormBuilder, public dbServise: DbService) {
    this.regForm = this.fb.group({
      nameReg: ['', [Validators.required, Validators.pattern('^[а-яА-ЯЁё]+\\s[а-яА-ЯЁё]+$')]],
      emailReg: ['', [Validators.required, Validators.email]],
      passwordReg: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]],
      confirmPasswordReg: ['', [Validators.required]]
    });
  }

  // Валидатор для проверки совпадения паролей
  checkPasswordValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('passwordReg')?.value;
    const confirmPassword = formGroup.get('confirmPasswordReg')?.value;

    if (password !== confirmPassword) {
      // this.regError = 'passwordMismatch'
      return {'passwordMismatch': true};
    }
    // this.regError = null;
    return null;
  }

  // @ViewChild('field') field!: ElementRef;

  // Скрыть/показать элемент
  // boom() {
  //   this.field.nativeElement.style.display === '' ?
  //     this.field.nativeElement.style.display = 'none' :
  //     this.field.nativeElement.style.display = '';
  // }


  onLogin(): void {
    this.loginError = null;
    const clientsData = {
      email_client: this.loginForm.get('emailLogin')?.value,
      password_client: this.loginForm.get('passwordLogin')?.value,
    };
    if(clientsData.email_client === '' || clientsData.password_client === '') {
      this.loginError = 'Заполните все поля';
      if (clientsData.email_client === '')
        this.loginForm.get('emailLogin')?.markAsTouched()
      if (clientsData.password_client === '')
        this.loginForm.get('passwordLogin')?.markAsTouched()
    }

      else {
    this.authService.login(clientsData).subscribe({
      next: (response) => {
        // console.log('Вход выполнен успешно', response);
        this.notificationService.showSuccess("Вход выполнен успешно");
        this.loginForm.reset();
        this.router.navigate(['/lk']);
      },
      error: (err) => {
        console.error('Ошибка при входе', err);
        this.loginError = err.error.error;
      }
    });
    }
  }

  // Отправка формы
  onRegister() {
    this.regError = null;
    const clientsData = {
      name_client: this.regForm.get('nameReg')?.value,
      email_client: this.regForm.get('emailReg')?.value,
      password_client: this.regForm.get('passwordReg')?.value,
      confirmPassword_client: this.regForm.get('confirmPasswordReg')?.value,
    };

    // Проверяем, все ли поля формы валидны и заполнены
    if (this.regForm.invalid) {
      // Обработка ошибки, если форма невалидна
      Object.keys(this.regForm.controls).forEach(field => {
        const control = this.regForm.get(field);
        if (control?.invalid) {
          control.markAsTouched(); // Отмечаем поле как затронутое для отображения ошибок
        }
        this.regError='Заполните все поля';
      });
      // console.log('Форма невалидна');
      return; // Не продолжаем отправку, если форма невалидна
    }

    if(clientsData.password_client !== clientsData.confirmPassword_client) {
      this.regError='Пароли не совпадают';
      return;
    }

    // Все поля валидны, продолжаем отправку

    this.authService.register(clientsData).subscribe({
      next: (response) => {
        // console.log('Регистрация выполнена успешно', response);
        this.notificationService.showSuccess("Регистрация выполнена успешно");
        this.regForm.reset(); // Сброс формы после успешной отправки
        this.isToggled = false;
      },
      error: (err) => {
        console.error('Ошибка при регистрации', err);
        this.regError = err.error.error;
      }
    });
  }

  showPasswordLogin = false;
  showPasswordReg1 = false;
  showPasswordReg2 = false
  onShowPass(){
    this.showPasswordLogin = !this.showPasswordLogin;
  }
  onShowPassReg1(){
    this.showPasswordReg1 = !this.showPasswordReg1;
  }
  onShowPassReg2(){
    this.showPasswordReg2 = !this.showPasswordReg2;
  }
}


