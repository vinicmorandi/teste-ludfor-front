import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule, 
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor (private usuarioService: UsuarioService) { }

  failedLogin = signal(false)

  loginForm = new FormGroup({
    email: new FormControl<string|null>(null, [
      Validators.required,
      Validators.email,
      Validators.maxLength(60),
    ]),
    senha: new FormControl<string|null>(null,  [
      Validators.required,
      Validators.maxLength(20),
    ]),
  });

  get email() {
    return this.loginForm.get('email');
  }
  get senha() {
    return this.loginForm.get('senha');
  }

  onSubmit = () => {
    console.log(this.loginForm.value);

    this.loginForm.markAllAsTouched()

    if (this.email?.valid && this.senha?.valid) {
      this.usuarioService.logar(this.loginForm.getRawValue()).subscribe((response) => {
        if (!response.sucesso) {
          this.failedLogin.set(true)
        }
    })
    }
  }

  login = () => {}
}
