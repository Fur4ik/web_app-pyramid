import {inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {concatMap, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  authService = inject(AuthService);

  getData(): Observable<any>{
    return this.authService.getData();
  }

  getUserId(): Observable<string>{
    return this.getData().pipe(
      map(data => data[0].id_client),
    )
  }

  getUserName(): Observable<string>{
    return this.getData().pipe(
      map(data => data[0].name_client),
    )
  }
  getUserEmail():Observable<string>{
    return this.getData().pipe(
      map(data => data[0].email_client),
    )
  }

}
