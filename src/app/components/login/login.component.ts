import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { Router } from '@angular/router';
import { FieldMapComponent } from '../field-map/field-map.component';
import { Coluna } from '../../interfaces/coluna';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FieldMapComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private supabaseService: SupabaseService,
    private toastService: ToastService,
    private router: Router
  ) {}

  modo: 'login' | 'signup' = 'login';

  // Campos do login usados para fazer o mapa de inputs
  loginFields: Array<Coluna> = [
    {
      key: 'email',
      texto: 'Email',
      tipo: 'email',
      config: {
        required: true,
        email: true,
        maxLength: 60,
        placeholder: 'exemplo@email.com',
      },
    },
    {
      key: 'senha',
      texto: 'Senha',
      tipo: 'password',
      config: {
        required: true,
        maxLength: 20,
        placeholder: '••••••••',
      },
    },
  ];

  // Campos do cadastro usados para a validação
  loginForm = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
      Validators.maxLength(60),
    ]),
    senha: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(20),
    ]),
  });

  // Campos do cadastro usados para fazer o mapa de inputs
  signupFields: Array<Coluna> = [
    {
      key: 'email',
      texto: 'Email',
      tipo: 'email',
      config: {
        required: true,
        email: true,
        maxLength: 60,
        placeholder: 'exemplo@email.com',
      },
    },
    {
      key: 'senha',
      texto: 'Senha',
      tipo: 'password',
      config: {
        required: true,
        maxLength: 20,
        placeholder: '••••••••',
      },
    },
    {
      key: 'username',
      texto: 'Username',
      tipo: 'text',
      config: {
        required: true,
        maxLength: 20,
        placeholder: 'NomeLegal7921',
      },
    },
    {
      key: 'nome_completo',
      texto: 'Nome Completo',
      tipo: 'text',
      config: {
        required: true,
        maxLength: 80,
        placeholder: 'Fulano da Silva',
      },
    },
    {
      key: 'telefone',
      texto: 'Telefone',
      tipo: 'mask',
      config: {
        maxLength: 11,
        placeholder: '(54) 99968-0612',
        mask:"(99) 99999-9999"
      },
    },
  ];

  // Campos do cadastro usados para a validação
  signupForm = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
      Validators.maxLength(60),
    ]),
    senha: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    username: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    nome_completo: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(80),
    ]),
    telefone: new FormControl<string | null>(null, [
      Validators.maxLength(11),
    ]),
  });

  // Ao enviar o formulário, marca todos os campos como touched para que o usuário possa ver se tem algum erro
  // Depois, faz o login ou o cadastro, dependendo do modo atual
  async onSubmit(): Promise<void> {
    this.loginForm.markAllAsTouched();

    if (this.modo === 'login') {
      await this.handleLogin();
    } else {
      await this.handleSignup();
    }
  }

  // Checa se os campos do login estão válidos, depois faz o login no supabase
  // Se o login der errado, dá um toast, se não, vai para a tela principal
  async handleLogin(): Promise<void> {
    if (
      this.loginForm.get('email')?.valid &&
      this.loginForm.get('senha')?.valid
    ) {
      const { error } = await this.supabaseService.signIn(
        this.loginForm.get('email')?.value!,
        this.loginForm.get('senha')?.value!
      );

      if (error) {
        this.toastService.error('Email ou senha incorretos');
      } else {
        this.router.navigate(['']);
      }
    }
  }

  // Checa se os campos do cadastro são válidos, depois cadastra o usuário no supabase
  // Se der erro no cadastro, retorna um toast com uma mensagem e mais um com a mensagem de erro específica
  // Se der certo, dá um toast e vai para a página inicial
  async handleSignup(): Promise<void> {
    if (
      this.signupForm.get('email')?.valid &&
      this.signupForm.get('senha')?.valid &&
      this.signupForm.get('username')?.valid &&
      this.signupForm.get('nome_completo')?.valid &&
      this.signupForm.get('telefone')?.valid
    ) {
      const result = await this.supabaseService.signUp(
        this.signupForm.getRawValue()
      );

      if (result.error) {
        this.toastService.error('Erro ao criar conta nova');
        this.toastService.error(result.error);
      } else {
        this.toastService.success('Conta criada com sucesso!');
        this.router.navigate(['']);
      }
    }
  }
}
