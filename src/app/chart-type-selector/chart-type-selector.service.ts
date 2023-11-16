import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChartTypeSelectorService {
  selectedChartType: Subject<string>;

  constructor() {
    this.selectedChartType = new Subject<string>();
  }
}
