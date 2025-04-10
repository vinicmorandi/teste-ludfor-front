import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../../supabase/supabase.service';
@Injectable({
  providedIn: 'root',
})
export class UsuarioAutenticadoGuard implements CanActivate {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}
  canActivate() {
    // Route guard simples, só deixa o usuário acessar a tela principal se ele estiver logado
    if (this.supabaseService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
