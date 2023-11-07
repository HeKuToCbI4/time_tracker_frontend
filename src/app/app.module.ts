import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PerProcessUtilizationChartComponent } from './per-process-utilization-chart/per-process-utilization-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    PerProcessUtilizationChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
