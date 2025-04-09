import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';

interface LoginFormResult {
  email: string|null;
  senha: string|null;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  logar(result: LoginFormResult): Observable<any> {
    return this.mockUsuarioLogin(result).pipe(
      tap((resposta) => {
        if (!resposta.sucesso) return;

        localStorage.setItem(
          'token',
          btoa(JSON.stringify('TokenQueSeriaGeradoPelaAPI'))
        );

        localStorage.setItem('usuario', btoa(resposta.usuario));
        this.router.navigate(['']);
      })
    );
  }

  private mockUsuarioLogin(usuario: LoginFormResult): Observable<any> {
    var retornoMock: any = [];

    if (usuario.email === 'exemplo@email.com' && usuario.senha == '123') {
      retornoMock.sucesso = true;
      retornoMock.usuario = usuario;
      retornoMock.token = 'TokenQueSeriaGeradoPelaAPI';
      return of(retornoMock);
    }

    retornoMock.sucesso = false;
    retornoMock.usuario = usuario;
    return of(retornoMock);
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): Usuario | null {
    return localStorage.getItem('usuario')
      ? JSON.parse(atob(localStorage.getItem('usuario') || ''))
      : null;
  }

  get obterIdUsuarioLogado(): number | null {
    return localStorage.getItem('usuario')
      ? (JSON.parse(atob(localStorage.getItem('usuario') || '')) as Usuario).id
      : null;
  }

  get obterTokenUsuario(): string | null {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token') || ''))
      : null;
  }

  get logado(): boolean {
    return typeof localStorage !== 'undefined' && localStorage.getItem('token') ? true : false;
  }
}
