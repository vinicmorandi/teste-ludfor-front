import { Component } from '@angular/core';
import { SimpleTableComponent } from '../simple-table/simple-table.component';
import { Coluna } from '../../interfaces/coluna';
import { Funcionario } from '../../interfaces/funcionario';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { FuncionariosFormComponent } from '../funcionarios-form/funcionarios-form.component';
import { ToastService } from 'angular-toastify';


@Component({
  selector: 'app-funcionarios',
  imports: [
    SimpleTableComponent,
    SidebarComponent,
    ButtonModule,
    FuncionariosFormComponent,
  ],
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.scss',
})
export class FuncionariosComponent {
  constructor(private supabaseService: SupabaseService, private toastService: ToastService) {}

  // Colunas dos funcionários para criar a tabela
  colunasFuncionarios: Array<Coluna> = [
    {
      key: 'id',
      texto: 'Id',
      tipo: 'text',
    },
    {
      key: 'nome',
      texto: 'Nome',
      tipo: 'text',
    },
    {
      key: 'email',
      texto: 'Email',
      tipo: 'text',
    },
    {
      key: 'celular',
      texto: 'Celular',
      tipo: 'text',
    },
    {
      key: 'ativo',
      texto: 'Ativo',
      tipo: 'boolean',
      config: {
        true: 'Ativo',
        false: 'Inativo',
      },
    },
    {
      key: 'ramal',
      texto: 'Ramal',
      tipo: 'text',
    },
    {
      key: 'bairro',
      texto: 'Bairro',
      tipo: 'text',
    },
    {
      key: 'complemento',
      texto: 'Complemento',
      tipo: 'text',
    },
    {
      key: 'logradouro',
      texto: 'Logradouro',
      tipo: 'text',
    },
    {
      key: 'numero',
      texto: 'Numero',
      tipo: 'text',
    },
    {
      key: 'cidade',
      texto: 'Cidade',
      tipo: 'text',
    },
    {
      key: 'estado',
      texto: 'Estado',
      tipo: 'text',
    },
  ];

  registrosFuncionarios: Array<Funcionario> = [];
  dados: any;
  loading = true;
  visible = false;

  // Mostra a modal
  showDialog = () => {
    this.visible = true;
  };

  // Pega os funcionários em ordem decrescente de ID (os últimos adicionados vem primeiro)
  async getFuncionarios() {
    this.loading = true;
    const { data } = await this.supabaseService.supabase
      .from('funcionarios')
      .select()
      .order('id', { ascending: false });

    this.registrosFuncionarios = data as Funcionario[];
    this.loading = false;
  }

  // Passa os dados do funcionário escolhido para a modal e abre ela
  editar = (registro: any) => {
    this.dados = registro;
    this.showDialog();
  };
  
  // Exclui o funcionário
  async excluir(registro: any) {
    const { error } = await this.supabaseService.supabase
      .from('funcionarios')
      .delete()
      .eq('id', registro.id)

    if (error) {
      this.toastService.error('Erro ao excluir funcionário');
      this.toastService.error(error.message);
    } else {
      this.toastService.success('Funcionário excluído com sucesso!');
      this.getFuncionarios();
    }
  };

  // Esconde a modal, reseta os dados, e atualiza a tabela de funcionários
  hide = () => {
    this.visible = false;
    this.dados = null;
    this.getFuncionarios();
  };

  // Ao abrir a página, pega a listagem de funcionários
  ngOnInit() {
    this.getFuncionarios();
  }
}
