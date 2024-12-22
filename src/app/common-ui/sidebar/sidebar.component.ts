import {Component, inject} from '@angular/core';
import { RouterLink } from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';
import {AuthService} from '../../servises/auth.service';
import {CommonModule} from '@angular/common';
import {LkComponent} from '../../pages/lk/lk.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor() {
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
