import { AddColumnComponent } from './add-column.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('AddColumnComponent', () => {
  let component: AddColumnComponent;
  let fixture: ComponentFixture<AddColumnComponent>;

  beforeEach(waitForAsync (() => {
   TestBed.configureTestingModule({
      imports: [AddColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
