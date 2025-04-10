import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { UsuarioNaoAutenticadoGuard } from './services/usuarios/guards/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './services/usuarios/guards/usuario-autenticado.guard';

export const routes: Routes = [
  // Rota de login, só pode ser acessada se não estiver autenticado
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UsuarioNaoAutenticadoGuard],
  },
  // Página principal, só pode ser acessada se estiver autenticado
  {
    path: '',
    component: FuncionariosComponent,
    canActivate: [UsuarioAutenticadoGuard],
  },
];
