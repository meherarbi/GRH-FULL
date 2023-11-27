import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetListComponent } from './time-sheet-list.component';

describe('TimeSheetListComponent', () => {
  let component: TimeSheetListComponent;
  let fixture: ComponentFixture<TimeSheetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeSheetListComponent]
    });
    fixture = TestBed.createComponent(TimeSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
