import {Component, OnInit} from '@angular/core';
import {PerProcessUtilizationService} from "../per-process-utilization.service";
import {PerProcessUtilization} from "../per-process-utilization.interface";
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-per-process-utilization-chart',
  templateUrl: './per-process-utilization-chart.component.html',
  styleUrls: ['./per-process-utilization-chart.component.css']
})
export class PerProcessUtilizationChartComponent implements OnInit {
  per_process_utilization: PerProcessUtilization[] = [];

  constructor(private perProcessUtilizationService: PerProcessUtilizationService) {
  }


  ngOnInit(): void {
    var labels: string[] = [];
    var data: number[] = [];
    var myChart = new Chart("per-process-utilization-chart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          barPercentage: 1,
          maxBarThickness: 50,
          label: 'Hours spend per process',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 3,
        }]
      },
      options: {
        scales: {
          y: {
            display: true,
            beginAtZero: true
          }
        }
      }
    });
    this.perProcessUtilizationService.GetUtilization().subscribe((utilizations) => {
      this.per_process_utilization = utilizations;
      utilizations.forEach((utilization) => {
        myChart.data.datasets[0].data.push(utilization.duration / 1000000 / 60 / 60);
        if (myChart.data.labels) {
          myChart.data.labels.push(utilization.executable_name);
        }
        myChart.update();
      })
    });
  }
}
