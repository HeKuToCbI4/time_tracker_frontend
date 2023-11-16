import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HostSelectorService {

  selectedHost: Subject<string>;

  constructor() {
    this.selectedHost = new Subject<string>();
  }
}
