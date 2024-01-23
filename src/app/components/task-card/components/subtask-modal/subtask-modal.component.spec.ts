import { SubtaskModalComponent } from './subtask-modal.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('SubtaskModalComponent', () => {
  let component: SubtaskModalComponent;
  let fixture: ComponentFixture<SubtaskModalComponent>;

  beforeEach(waitForAsync (() => {
   TestBed.configureTestingModule({
      imports: [SubtaskModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtaskModalComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    component.subtask = {
      id: "1",
      title: "Subtask test",
      isCompleted: true
    };

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
