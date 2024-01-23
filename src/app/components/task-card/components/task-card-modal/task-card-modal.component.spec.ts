import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskCardModalComponent } from './task-card-modal.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('TaskCardModalComponent', () => {
  let component: TaskCardModalComponent;
  let fixture: ComponentFixture<TaskCardModalComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [TaskCardModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { task: {
          id: "1",
          title: "Test task",
          status: "TODO",
          description: "",
          subtasks: []
        }, completedAmount: 5 } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
