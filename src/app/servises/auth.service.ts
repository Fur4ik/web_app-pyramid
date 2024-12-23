import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);

  // private apiUrl = 'http://localhost:3000/api'; // URL вашего API
  private apiUrl = '/api'; // URL вашего API

  constructor(private http: HttpClient) {
  }

  // Метод для регистрации
  register(regData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, regData);
  }

  // Метод для входа (авторизации)
  login(logData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, logData).pipe(
      tap((response: any) => {
        if (response.token) {
          this.saveToken(response.token);
          this.saveData(logData.email_client);
        }
      })
    );
  }

  // Метод для выхода (удаление токена)
  logout(): void {
    this.removeToken();
    this.removeData();
    this.router.navigate(['/']);
  }

  // Метод для сохранения токена в localStorage
  private saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  renameEmail(email: string | null | undefined): void {
    this.removeData();
    this.saveData(email);
  }

  private saveData(data: any): void {
    localStorage.setItem('data', JSON.stringify(data));
  }

  // Метод для получения токена из localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }


  getData() {
    let data = localStorage.getItem('data');
    if (data?.startsWith('"') && data?.endsWith('"')) {
      data = data.slice(1, -1); // Убираем кавычки, если они есть
    }
    return this.http.get<any>(`${this.apiUrl}/user/${data}`);
  }

  // Метод для удаления токена из localStorage
  private removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  private removeData(){
    localStorage.removeItem('data');
  }

  // Проверка, авторизован ли пользователь
  isLoggedIn(): boolean {
    return !!this.getToken();
  }


}
