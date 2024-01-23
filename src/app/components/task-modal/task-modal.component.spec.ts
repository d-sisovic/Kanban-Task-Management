import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskModalComponent } from './task-modal.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [
        TaskModalComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { selectedTask: null }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
