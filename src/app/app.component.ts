import { afterNextRender, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase/supabase.service';
import { Session } from '@supabase/supabase-js';
import { ToastService, AngularToastifyModule } from 'angular-toastify';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AngularToastifyModule],
  providers: [ToastService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  session: Session|null;

  constructor(private readonly supabase: SupabaseService) {
    this.session = this.supabase.session;
  }

  // Ao iniciar o aplicativo, ele começa a checar atualizações no Auth do supabase e atualizar a sessão atual
  ngOnInit() {
    this.supabase.authChanges((_, session) => {
      return (this.session = session);
    });
  }
}
