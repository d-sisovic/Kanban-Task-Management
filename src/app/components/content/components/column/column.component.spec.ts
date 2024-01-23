import { ColumnComponent } from './column.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [ColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    component.column = {
      id: "1",
      name: "TO DO",
      tasks: []
    };

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
