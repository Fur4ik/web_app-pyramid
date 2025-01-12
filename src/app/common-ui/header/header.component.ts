import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import { RouterLink } from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';
import {AuthService} from '../../servises/auth.service';
import {CommonModule} from '@angular/common';
import {LkComponent} from '../../pages/lk/lk.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor() {
  }


  @ViewChild('header_under') field!: ElementRef;

  // @ViewChild('field') field!: ElementRef;

  // Скрыть/показать элемент
  hideBar() {
    if(this.field.nativeElement.style.visibility === 'visible') {
      this.field.nativeElement.style.visibility = 'hidden'
      this.field.nativeElement.style.opacity = 0
    }
    else {
      this.field.nativeElement.style.visibility = 'visible';
      this.field.nativeElement.style.opacity = 1;
    }
  }


  authService = inject(AuthService);

  dataUser={
    name_client: '',
    email_client: '',
    role_client: '',
  };


  ngOnInit() {
    this.authService.getData().subscribe(
      (response) => {
        this.dataUser = response[0];
        // console.log('Component', this.dataUser);
      },
      (error) => {
        console.error('Ошибка при получении данных:', error);
      }
    );
  }
}
