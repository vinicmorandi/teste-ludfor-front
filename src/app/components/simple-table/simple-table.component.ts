import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Coluna } from '../../interfaces/coluna';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-simple-table',
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
  ],
  templateUrl: './simple-table.component.html',
  styleUrl: './simple-table.component.scss'
})

export class SimpleTableComponent {
  @Input() colunas!: Array<Coluna>;
  @Input() registros!: Array<any>;
  @Input() loading!: boolean;
  @Output("editar") editar: EventEmitter<any> = new EventEmitter();
}
