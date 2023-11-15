import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {PerProcessUtilizationService} from "../per-process-utilization.service";
import {PerProcessUtilization} from "../per-process-utilization.interface";
import {Chart, registerables} from 'chart.js';
import {ChartTypeSelectorService} from "../chart-type-selector.service";

Chart.register(...registerables);

@Component({
  selector: 'app-per-process-utilization-chart',
  templateUrl: './per-process-utilization-chart.component.html',
  styleUrls: ['./per-process-utilization-chart.component.css'],
})
export class PerProcessUtilizationChartComponent implements OnInit, AfterViewChecked {
  per_process_utilization: PerProcessUtilization[] = [];
  displayedColumns: string[] = ['executable_name', 'duration', 'executable_path'];
  public loading: boolean = true;
  public selectedChartType: string = 'bar';
  myChart: Chart<'bar'> | Chart<'pie'> | undefined;

  constructor(private perProcessUtilizationService: PerProcessUtilizationService, private chartTypeSelectorService: ChartTypeSelectorService) {
  }

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

  ngOnInit(): void {
    this.createChart();
    this.chartTypeSelectorService.selectedChartType.asObservable().subscribe((selectedChartType) => {
      this.selectedChartType = selectedChartType;
      this.createChart();
    })
  }

  ngAfterViewChecked() {

  }

  protected createChart() {
    let canvas = document.getElementById('per-process-utilization-chart');
    console.log(canvas);
    this.myChart?.destroy();
    if (this.selectedChartType == 'bar') {
      this.myChart = this.createBarChart()
    } else {
      this.myChart = this.createPieChart();
    }
    this.updateChartData(this.myChart);
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
}
