import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskReportViewComponent } from './task-report-view.component';

describe('TaskReportViewComponent', () => {
  let component: TaskReportViewComponent;
  let fixture: ComponentFixture<TaskReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskReportViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
