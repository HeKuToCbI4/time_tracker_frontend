import {Component, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HostSelectorService} from './host-selector.service'
import {NgForOf} from "@angular/common";
import {HostListRetrieverService} from '../host-list-retriever.service'

interface HostOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-host-selector',
  templateUrl: './host-selector.component.html',
  styleUrls: ['./host-selector.component.css'],
  imports: [MatFormFieldModule, MatSelectModule, NgForOf],
  standalone: true
})
export class HostSelectorComponent implements OnInit {
  options: HostOption[] = [
    {name: 'All', value: 'all'},
  ]

  constructor(private chartTypeSelectorService: HostSelectorService, private hostRetriever: HostListRetrieverService) {
  }

  onSelectedHostChanged(event: any) {
    console.log(event.value);
    this.chartTypeSelectorService.selectedHost.next(event.value);
  }

  ngOnInit(): void {
    this.hostRetriever.GetHosts().subscribe(hosts => {
      if (hosts) {
        hosts.forEach(host => {
          this.options.push({name: host.address, value: host.address})
        });
      }
    })
  }
}

