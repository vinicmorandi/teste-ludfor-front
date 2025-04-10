import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../../supabase/supabase.service';
@Injectable({
  providedIn: 'root',
})
export class UsuarioNaoAutenticadoGuard implements CanActivate {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  // Route guard simples, só deixa o usuário acessar a tela de login se ele não estiver logado
  canActivate() {
    if (this.supabaseService.isLoggedIn()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
