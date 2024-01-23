import { EmptyBoardComponent } from './empty-board.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('EmptyBoardComponent', () => {
  let component: EmptyBoardComponent;
  let fixture: ComponentFixture<EmptyBoardComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [EmptyBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
