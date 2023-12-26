import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalDeleteComponent } from './task-modal-delete.component';

describe('TaskModalDeleteComponent', () => {
  let component: TaskModalDeleteComponent;
  let fixture: ComponentFixture<TaskModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModalDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
