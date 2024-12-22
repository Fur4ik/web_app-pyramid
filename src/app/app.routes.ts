import { RouterModule, Routes } from '@angular/router';
import { LoyoutComponent } from './common-ui/loyout/loyout.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { TrensessPageComponent } from './pages/trensess-page/trensess-page.component';
import { AdminScheduleDbComponent } from './admin/admin-schedule-db/admin-schedule-db.component';
import {LkComponent} from './pages/lk/lk.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '', component: LoyoutComponent, children: [
            { path: '', redirectTo: 'main', pathMatch: 'full' },
            { path: 'main', component: MainPageComponent, title: 'Главная | Pyramida' },
            { path: 'schedule', component: SchedulePageComponent, title: 'Расписание | Pyramida' },
            { path: 'contacts', component: ContactsPageComponent, title: 'Контакты | Pyramida' },
            { path: 'login', component: LoginPageComponent, title: 'Вход | Pyramida' },
            { path: 'lk', component: LkComponent, title: 'Личный кабинет', canActivate:[AuthGuard]},
            { path: 'traning session', component: TrensessPageComponent, title: 'Мои тренировки | Pyramida', canActivate:[AuthGuard] },
            { path: 'admin schedule', component: AdminScheduleDbComponent, title: 'Админ | Расписание', canActivate:[AuthGuard]},
        ],
    },
    // {path:'login',component: LoginPageComponent}
];
