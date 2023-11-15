import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PerProcessUtilizationChartComponent} from './per-process-utilization-chart.component';

describe('PerProcessUtilizationChartComponent', () => {
  let component: PerProcessUtilizationChartComponent;
  let fixture: ComponentFixture<PerProcessUtilizationChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerProcessUtilizationChartComponent]
    });
    fixture = TestBed.createComponent(PerProcessUtilizationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
