import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostSelectorComponent } from './host-selector.component';

describe('HostSelectorComponent', () => {
  let component: HostSelectorComponent;
  let fixture: ComponentFixture<HostSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostSelectorComponent]
    });
    fixture = TestBed.createComponent(HostSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
