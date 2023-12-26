import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardModalDeleteComponent } from './board-modal-delete.component';

describe('BoardModalDeleteComponent', () => {
  let component: BoardModalDeleteComponent;
  let fixture: ComponentFixture<BoardModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardModalDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
