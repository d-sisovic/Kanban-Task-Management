import { TaskCardComponent } from './task-card.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [TaskCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    component.task = {
      id: "1",
      title: "Test task",
      status: "TO DO",
      description: "",
      subtasks: []
    };

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
