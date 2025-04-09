import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoGuard]},
  {
    path: '', component: FuncionariosComponent, canActivate: [UsuarioAutenticadoGuard],
  },
];
