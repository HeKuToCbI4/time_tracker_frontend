import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PerProcessUtilizationChartComponent } from './per-process-utilization-chart/per-process-utilization-chart.component';
import {NgOptimizedImage} from "@angular/common";
import { ChartTypeSelectorComponent } from './chart-type-selector/chart-type-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatLegacyTableModule} from "@angular/material/legacy-table";

@NgModule({
  declarations: [
    AppComponent,
    PerProcessUtilizationChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgOptimizedImage,
    ChartTypeSelectorComponent,
    BrowserAnimationsModule,
    MatLegacyTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
