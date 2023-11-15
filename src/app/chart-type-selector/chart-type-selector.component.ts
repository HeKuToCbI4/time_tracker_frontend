import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ChartTypeSelectorService} from '../chart-type-selector.service'
import {NgForOf} from "@angular/common";

interface ChartTypeOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-chart-type-selector',
  templateUrl: './chart-type-selector.component.html',
  styleUrls: ['./chart-type-selector.component.css'],
  imports: [MatFormFieldModule, MatSelectModule, NgForOf],
  standalone: true
})
export class ChartTypeSelectorComponent {
  options: ChartTypeOption[] = [
    {name: 'bar', value: 'bar'},
    {name: 'pie', value: 'pie'}
  ]

  constructor(private chartTypeSelectorService: ChartTypeSelectorService) {
  }

  onChartTypeChanged(event: any) {
    console.log(event.value);
    this.chartTypeSelectorService.selectedChartType.next(event.value);
  }
}

