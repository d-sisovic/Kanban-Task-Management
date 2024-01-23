import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardModalComponent } from './board-modal.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('BoardModalComponent', () => {
  let component: BoardModalComponent;
  let fixture: ComponentFixture<BoardModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BoardModalComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { board: null } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BoardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
