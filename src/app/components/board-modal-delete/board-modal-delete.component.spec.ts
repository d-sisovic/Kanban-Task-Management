import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardModalDeleteComponent } from './board-modal-delete.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('BoardModalDeleteComponent', () => {
  let component: BoardModalDeleteComponent;
  let fixture: ComponentFixture<BoardModalDeleteComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [BoardModalDeleteComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { board: {
          id: "1",
          name: "To do tabela",
          columns: [],
          selected: true
        } }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
