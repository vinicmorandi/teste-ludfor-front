import { Component, Input } from '@angular/core';
import { Coluna } from '../../interfaces/coluna';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-field-map',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToggleSwitchModule,
    KeyFilterModule,
    InputMaskModule,
  ],
  templateUrl: './field-map.component.html',
  styleUrl: './field-map.component.scss'
})
export class FieldMapComponent {
  @Input() formClass:string = '';
  @Input() fields!: Array<Coluna>;
  @Input() controlForm!: FormGroup;
}
