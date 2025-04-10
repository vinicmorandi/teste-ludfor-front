import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  // Desloga o usuário do sistema
  deslogar = () => {
    this.supabaseService.signOut();
  };
}
