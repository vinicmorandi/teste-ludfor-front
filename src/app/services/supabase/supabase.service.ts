import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr'
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
}
@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient;
  _session: AuthSession | null = null;

  // Cria um supabase client do lado do usuário, mas não cria no lado do servidor
  constructor(private router: Router) {
    this.supabase = createBrowserClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Observa as atualizações no Auth do supabase e executa um callback
  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  // Pega os dados da sessão do supabase
  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  // Faz login
  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  // Cadastra usuário, faz login, e faz o salvamento das informações dele em uma tabela separada
  // Caso ocorra algum erro no caminho, retora a mensagem dentro de um { error: string | null }
  async signUp(value: any):Promise<any> {
    const { data, error: signUpError } = await this.supabase.auth.signUp({
      email: value.email,
      password: value.senha,
    })

    if (signUpError) {
      return {
        error: signUpError.message
      }
    }

    this.signIn(value.email, value.senha)

    const { error: createUserError } = await this.supabase.from('usuarios').insert({
      username: value.username,
      nome_completo: value.nome_completo,
      telefone: value.telefone,
      uuid: data.user?.id,
    })

    if (createUserError) {
      return {
        error: createUserError.message
      }
    }

    return {
      error: null
    }

  }

  // Desloga o usuário do sistema e o joga de volta para a tela de login
  signOut() {
    this.supabase.auth.signOut();

    setTimeout(() => {
      window.location.href = '/login'
    }, 500)

    return
  }

  // Para poder fazer o SSR e ter um carregamento mais rápido, eu usei o supabase/ssr, que usa cookies ao invés do local storage
  isLoggedIn() {
    return this.getCookie('sb-ngeeyagrzqnexkpuqorj-auth-token')
  }

  getCookie(name:string) {
    if (typeof document !== 'undefined') {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);

      if (parts.length === 2) {
        const newPart = parts.pop()

        if (newPart) {
          return newPart.split(';').shift();
        }
      }
    }

    return null
  }
}
