import {Routes} from '@angular/router';
import {Login} from './pages/login/login';
import {AuthLayout} from './layouts/auth.layout/auth.layout';
import {authGuard} from './guards/auth-guard';

export const routes: Routes = [
  {
  {
    path: 'login',
    component: AuthLayout,
    children: [
      {path: '', component: Login}
    ]
  },
];
