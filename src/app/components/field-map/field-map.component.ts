import { Component, Input } from '@angular/core';
import { Coluna } from '../../interfaces/coluna';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-field-map',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToggleSwitchModule,
  ],
  templateUrl: './field-map.component.html',
  styleUrl: './field-map.component.scss'
})
export class FieldMapComponent {
  @Input() formClass:string = '';
  @Input() fields!: Array<Coluna>;
  @Input() controlForm!: FormGroup;
}
