import { Component } from '@angular/core';
import { SimpleTableComponent } from "../simple-table/simple-table.component";
import { Coluna } from '../../interfaces/coluna';
import { Funcionario } from '../../interfaces/funcionario';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-funcionarios',
  imports: [SimpleTableComponent, SidebarComponent],
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.scss'
})
export class FuncionariosComponent {
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
        false: 'Inativo'
      }
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
  ]

  registrosFuncionarios: Array<Funcionario> = [
    {
      id: 1,
      nome: 'Aaa',
      email: 'sadasjido@fajnios.com',
      celular: '44123123',
      ativo: true,
      ramal: 'dasdsad',
      bairro: 'sddsasad',
      complemento: 'saasdsa',
      logradouro: 'sasaddsadsadsa',
      numero: 'sdasadadssad',
      cidade: 'sadsadsadasdsad',
      estado: 'sadsadsadsad'
    }
  ]
}
