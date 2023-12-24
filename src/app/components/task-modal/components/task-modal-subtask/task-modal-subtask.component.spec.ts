import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalSubtaskComponent } from './task-modal-subtask.component';

describe('TaskModalSubtaskComponent', () => {
  let component: TaskModalSubtaskComponent;
  let fixture: ComponentFixture<TaskModalSubtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModalSubtaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskModalSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
