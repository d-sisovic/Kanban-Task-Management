import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskModalDeleteComponent } from './task-modal-delete.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('TaskModalDeleteComponent', () => {
  let component: TaskModalDeleteComponent;
  let fixture: ComponentFixture<TaskModalDeleteComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [TaskModalDeleteComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { selectedTask: {
          id: "1",
          title: "Test task",
          status: "TODO",
          description: "",
          subtasks: []
        } }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
