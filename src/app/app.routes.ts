import {Routes} from '@angular/router';
import {Login} from './pages/login/login';
import {Companies} from './pages/admin/companies/companies';
import {AuthLayout} from './layouts/auth.layout/auth.layout';
import {ControlPanelAdmin} from './pages/admin/control-panel-admin/control-panel-admin';
import {MainLayout} from './layouts/main.layout/main.layout';
import {AddCompanyComponent} from './Components/add-company.component/add-company.component';
import {authGuard} from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'admin',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {path: '', component: ControlPanelAdmin},
      {path: 'companies', component: Companies},
      {path: 'companies/add', component: AddCompanyComponent}
    ]
  },
  {
    path: 'login',
    component: AuthLayout,
    children: [
      {path: '', component: Login}
    ]
  },
];
