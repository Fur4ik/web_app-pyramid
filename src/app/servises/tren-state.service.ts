import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrenStateService {
  private countTrenSubject = new BehaviorSubject<number>(0); // Начальное значение
  countTren$ = this.countTrenSubject.asObservable();

  setCount(count: number): void {
    this.countTrenSubject.next(count); // Обновляем значение
  }

  decrementCount(): void {
    const currentCount = this.countTrenSubject.getValue();
    this.countTrenSubject.next(currentCount - 1);
  }
}
