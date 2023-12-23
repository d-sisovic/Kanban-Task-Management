import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardModalComponent } from './task-card-modal.component';

describe('TaskCardModalComponent', () => {
  let component: TaskCardModalComponent;
  let fixture: ComponentFixture<TaskCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
