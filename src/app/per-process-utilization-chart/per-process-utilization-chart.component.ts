import {Component, OnInit} from '@angular/core';
import {PerProcessUtilizationService} from "../per-process-utilization.service";
import {PerProcessUtilization} from "../per-process-utilization.interface";
import {Chart, registerables} from 'chart.js';
import {ChartTypeSelectorComponent} from '../chart-type-selector/chart-type-selector.component'
import {MatTableModule} from '@angular/material/table';

Chart.register(...registerables);

@Component({
  selector: 'app-per-process-utilization-chart',
  templateUrl: './per-process-utilization-chart.component.html',
  styleUrls: ['./per-process-utilization-chart.component.css'],
})
export class PerProcessUtilizationChartComponent implements OnInit {
  per_process_utilization: PerProcessUtilization[] = [];
  displayedColumns: string[] = ['executable_name', 'duration', 'executable_path'];
  public loading: boolean = true;

  createBarChart(labels: string[] = [], data: number[] = []): Chart<"bar"> {
    return new Chart("per-process-utilization-chart", {
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
  }

  createPieChart(labels: string[] = [], data: number[] = []): Chart<"pie"> {
    return new Chart("per-process-utilization-chart", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Hours spent per process',
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
  }

  constructor(private perProcessUtilizationService: PerProcessUtilizationService) {
  }

  protected createChart() {
    var selected = new ChartTypeSelectorComponent().selected;
    console.log(selected);
    var myChart: Chart<'bar'> | Chart<'pie'>;
    if (selected == 'bar')
    {
      myChart = this.createBarChart()
    }
    else {
      myChart = this.createPieChart();
    }
    this.updateChartData(myChart);
  }

  protected updateChartData(chart: Chart<"bar"> | Chart<"pie">): void {
    this.loading = true;
    this.perProcessUtilizationService.GetUtilization().subscribe((utilization) => {
      if (utilization) {
        this.loading = false;
        this.per_process_utilization = utilization;
        utilization.forEach((utilization) => {

          chart.data.datasets[0].data.push(utilization.duration / 1000000 / 60 / 60);
          if (chart.data.labels) {
            chart.data.labels.push(utilization.executable_name);
          }
          chart.update();
        })
      }
    });
  }

  ngOnInit(): void {
    this.createChart();
  }
}
