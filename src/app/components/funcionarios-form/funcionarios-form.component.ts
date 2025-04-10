import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { Coluna } from '../../interfaces/coluna';
import { ToastService } from 'angular-toastify';
import { FieldMapComponent } from '../field-map/field-map.component';

@Component({
  selector: 'app-funcionarios-form',
  imports: [DialogModule, ReactiveFormsModule, FieldMapComponent],
  templateUrl: './funcionarios-form.component.html',
  styleUrl: './funcionarios-form.component.scss',
})
export class FuncionariosFormComponent {
  constructor(
    private supabaseService: SupabaseService,
    private toastService: ToastService
  ) {}

  @Input() dados?: any | null;
  @Output('hideForm') hideForm: EventEmitter<any> = new EventEmitter();

  // Se o modal está visível
  visible = true;

  // Keys para fazer a substituição de campos ao abrir o formulário em modo de edição
  keys = [
    'id',
    'nome',
    'email',
    'celular',
    'ativo',
    'ramal',
    'bairro',
    'complemento',
    'logradouro',
    'numero',
    'cidade',
    'estado',
  ];

  // Campos dos funcionários para fazer o mapeamento de inputs
  fields: Array<Coluna> = [
    {
      key: 'nome',
      texto: 'Nome',
      tipo: 'text',
      config: {
        required: true,
        maxLength: 80,
        placeholder: 'Fulano da Silva',
      },
    },
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
      key: 'celular',
      texto: 'Celular',
      tipo: 'mask',
      config: {
        required: true,
        maxLength: 11,
        placeholder: '(54) 99968-0612',
        mask:"(99) 99999-9999"
      },
    },
    {
      key: 'ramal',
      texto: 'Ramal',
      tipo: 'text',
      config: {
        maxLength: 10,
        placeholder: '0000',
        filter: 'num'
      },
    },
    {
      key: 'bairro',
      texto: 'Bairro',
      tipo: 'text',
      config: {
        required: true,
        maxLength: 120,
        placeholder: 'São Francisco',
      },
    },
    {
      key: 'complemento',
      texto: 'Complemento',
      tipo: 'text',
      config: {
        maxLength: 120,
        placeholder: 'Apto, Sala, Condomínio, etc.',
      },
    },
    {
      key: 'logradouro',
      texto: 'Logradouro',
      tipo: 'text',
      config: {
        maxLength: 80,
        placeholder: 'Avenida',
      },
    },
    {
      key: 'numero',
      texto: 'Número',
      tipo: 'text',
      config: {
        maxLength: 15,
        placeholder: '710',
        filter: 'num'
      },
    },
    {
      key: 'cidade',
      texto: 'Cidade',
      tipo: 'text',
      config: {
        required: true,
        maxLength: 80,
        placeholder: 'Bento Gonçalves',
      },
    },
    {
      key: 'estado',
      texto: 'Estado',
      tipo: 'text',
      config: {
        required: true,
        maxLength: 40,
        placeholder: 'Rio Grande do Sul',
      },
    },
    {
      key: 'ativo',
      texto: 'Ativo',
      tipo: 'check',
      config: {
        required: true,
      },
    },
  ];

  // Campos do funcionário para fazer as validações
  funcionarioForm = new FormGroup({
    nome: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(80),
    ]),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
      Validators.maxLength(60),
    ]),
    celular: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(11),
    ]),
    ativo: new FormControl<string | null>(null, [Validators.required]),
    ramal: new FormControl<string | null>(null, [
      Validators.maxLength(10),
    ]),
    bairro: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(120),
    ]),
    complemento: new FormControl<string | null>(null, [
      Validators.maxLength(120),
    ]),
    logradouro: new FormControl<string | null>(null, [
      Validators.maxLength(80),
    ]),
    numero: new FormControl<string | null>(null, [
      Validators.maxLength(15),
    ]),
    cidade: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(80),
    ]),
    estado: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(40),
    ]),
  });

  // Ao abrir o modal, checa se foram passados os dados de um funcionário
  // Se sim, preenche os campos do formulário com os valores passados
  ngOnInit() {
    if (this.dados) {
      for (let key of this.keys) {
        if (
          typeof this.dados?.[key] !== 'undefined' &&
          this.funcionarioForm.get(key)
        ) {
          this.funcionarioForm.get(key)!.setValue(this.dados[key]);
        }
      }
    }
  }

  // Ao enviar, marca todos os campos como touched para o usuário ver se houve algum erro
  // Depois, faz as validações, e faz um upsert (update + insert) no banco com os dados atualizados
  // Se houver algum erro, dá um toast com uma mensagem e outro com o erro específico
  // Se não, dá um toast de sucesso e esconde o formulário
  async onSubmit(): Promise<void> {
    this.funcionarioForm.markAllAsTouched();

    const todasKeysValidas = this.fields.every(
      (field) => this.funcionarioForm.get(field.key)?.valid
    );

    if (todasKeysValidas) {
      const { error } = await this.supabaseService.supabase
        .from('funcionarios')
        .upsert({ id: this.dados?.id, ...this.funcionarioForm.getRawValue() });

      if (error) {
        this.toastService.error('Erro ao salvar funcionário');
        this.toastService.error(error.message);
      } else {
        this.toastService.success('Funcionário salvo com sucesso!');
        this.hideForm.emit();
      }
    }
  }
}
