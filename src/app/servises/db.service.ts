import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  authService = inject(AuthService);

  // private url = 'http://localhost:3000/api';
  private url ='/api';

  constructor(private http: HttpClient) {
  }


  //получение записей из таблицы schedule
  getSchedule(): Observable<any> {
    return this.http.get<Observable<any>>(`${this.url}/schedule`);
  }

  getScheduleId(id : string): Observable<any> {
    return this.http.get<Observable<any>>(`${this.url}/schedule/${id}`);
  }

  getUserSchedule(id: string): Observable<any> {
    return this.http.get<Observable<any>>(`${this.url}/user/${id}/schedule`);
  }

  postUserSchedule(id: string, id_tren: string): Observable<any> {
    return this.http.post(`${this.url}/user/${id}/schedule`, { id_tren }); // Передача id_tren как JSON
  }

  deleteTrenSchedule(id: string, id_tren: string): Observable<any> {
    return this.http.delete(`${this.url}/user/${id}/schedule/${id_tren}`);
  }

  getClients(): Observable<any> {
    return this.http.get<Observable<any>>(`${this.url}/clients`);
  }
  //добавление записи в таблицу schedule
  postSchedule(scheduleData: any): Observable<any> {
    return this.http.post(`${this.url}/schedule`, scheduleData);
  }

  //удаление записи из таблицы schedule
  deleteSchedule(id: number): Observable<any> {
    return this.http.delete(`${this.url}/schedule/${id}`);
  }



  //удаление записи из таблицы clients
  deleteClients(id: number): Observable<any> {
    return this.http.delete(`${this.url}/clients/${id}`);
  }

  updateUser(id: string, user_name: string | null | undefined, user_email: string | null | undefined): Observable<any> {
    return this.http.put(`${this.url}/user/data/${id}`, { new_name: user_name, new_email: user_email });
  }


  postFeedback(name: any, phone: any): Observable<any> {
    return this.http.post(`${this.url}/feedback`, {name_client: name, phone_client: phone});
  }

  getFeedback(): Observable<any> {
    return this.http.get<any>(`${this.url}/feedback`);
  }

  deleteFeedback(id: number): Observable<any> {
    return this.http.delete(`${this.url}/feedback/${id}`);
  }

  getSlider(){
    return this.http.get<any>(`${this.url}/slider`);
  }

  getCountTren(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/user/${id}/schedule/count`);
  }

}
