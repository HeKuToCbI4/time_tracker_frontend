import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {PerProcessUtilizationService} from "../per-process-utilization.service";
import {PerProcessUtilization} from "../per-process-utilization.interface";
import {Chart, registerables} from 'chart.js';
import {ChartTypeSelectorService} from "../chart-type-selector/chart-type-selector.service";
import {HostSelectorService} from "../host-selector/host-selector.service";

Chart.register(...registerables);

function getRandomColorHex() {
  var hex = "0123456789ABCDEF",
    color = "#";
  for (var i = 1; i <= 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
}

let defaultColors: string[] = [];
for (let i=0; i<50; i++)
{
  defaultColors.push(getRandomColorHex());
}

@Component({
  selector: 'app-per-process-utilization-chart',
  templateUrl: './per-process-utilization-chart.component.html',
  styleUrls: ['./per-process-utilization-chart.component.css'],
})
export class PerProcessUtilizationChartComponent implements OnInit, AfterViewChecked {
  per_process_utilization: PerProcessUtilization[] = [];
  displayedColumns = ['executable_name', 'duration', 'executable_path', 'host'];
  public loading = true;
  public selectedChartType: string = 'bar';
  public selectedHost: string = 'all';
  myChart: Chart<'bar'> | Chart<'pie'> | undefined;

  constructor(private perProcessUtilizationService: PerProcessUtilizationService, private chartTypeSelectorService: ChartTypeSelectorService, private hostSelector: HostSelectorService) {
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
          backgroundColor: defaultColors,
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
          backgroundColor: defaultColors,
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
    });
    this.hostSelector.selectedHost.asObservable().subscribe((selectedHost) => {
      this.selectedHost = selectedHost;
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
    this.updateChartData(this.myChart, this.selectedHost);
  }

  protected updateChartData(chart: Chart<"bar"> | Chart<"pie">, host: string): void {
    this.loading = true;
    this.perProcessUtilizationService.GetUtilization(this.selectedHost).subscribe((utilization) => {
      if (utilization) {
        this.loading = false;
        this.per_process_utilization = utilization;
        var colors = [];
        const valueSum = this.per_process_utilization.reduce((a, b) => a + b.duration, 0);
        const thresholdPercent = 1;
        const slices = this.per_process_utilization.map((v) => ({ label: v.executable_name, value: v.duration}))
          .reduce((accumulator: {label: string, value: number}[], currObj) => {
            const percent = 100 * currObj.value / valueSum;
            if (percent < thresholdPercent) {
              const others = accumulator.find(o => o.label == 'Others');
              if (!others) {
                return accumulator.concat({ label: 'Others', value: currObj.value });
              }
              others.value += currObj.value;
            } else {
              accumulator.push(currObj);
            }
            return accumulator;
          }, []);

        slices.forEach((utilization) => {
          chart.data.datasets[0].data.push(utilization.value / 1000000 / 60 / 60);
          if (chart.data.labels) {
            chart.data.labels.push(utilization.label);
          }
          chart.update();
        })
      }
    });
  }
}
