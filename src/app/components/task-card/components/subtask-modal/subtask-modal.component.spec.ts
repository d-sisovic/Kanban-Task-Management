import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskModalComponent } from './subtask-modal.component';

describe('SubtaskModalComponent', () => {
  let component: SubtaskModalComponent;
  let fixture: ComponentFixture<SubtaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtaskModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubtaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
