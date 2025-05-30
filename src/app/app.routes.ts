import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './services/auth.guard';
import { ImportarusuariosComponent } from './importarusuarios/importarusuarios.component';
import { LoginsincontraComponent } from './loginsincontra/loginsincontra.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'loginsincontra',
    component: LoginsincontraComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { minPowerLevel: 1 }
  },
  {
    path: 'consultas',
    component: ConsultasComponent,
    canActivate: [AuthGuard],
    data: { minPowerLevel: 2 }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { minPowerLevel: 3 }
  },
  {
    path: 'importarusuarios',
    component: ImportarusuariosComponent,
    canActivate: [AuthGuard],
    data: { minPowerLevel: 3 }
  }
];
