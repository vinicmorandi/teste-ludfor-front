import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor (private usuarioService: UsuarioService) { }

  deslogar = () => {
    this.usuarioService.deslogar()
  }
}
