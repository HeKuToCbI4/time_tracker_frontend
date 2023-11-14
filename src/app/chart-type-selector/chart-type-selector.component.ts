import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';
interface ChartTypeOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-chart-type-selector',
  templateUrl: './chart-type-selector.component.html',
  styleUrls: ['./chart-type-selector.component.css'],
  imports: [MatFormFieldModule, MatSelectModule],
  standalone: true
})
export class ChartTypeSelectorComponent {
  options : ChartTypeOption[] = [
    { name: 'bar', value: 'bar' },
    { name: 'pie', value: 'pie' }
  ]
  selected = 'bar';
}

