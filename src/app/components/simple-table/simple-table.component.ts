import { Component, Input } from '@angular/core';
import { Coluna } from '../../interfaces/coluna';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-simple-table',
  imports: [
    CommonModule,
    TableModule,
  ],
  templateUrl: './simple-table.component.html',
  styleUrl: './simple-table.component.scss'
})

export class SimpleTableComponent {
  @Input() colunas!: Array<Coluna>;
  @Input() registros!: Array<any>;
}
