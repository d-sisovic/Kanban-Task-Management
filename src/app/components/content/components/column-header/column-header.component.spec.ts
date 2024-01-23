import { ColumnHeaderComponent } from './column-header.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('ColumnHeaderComponent', () => {
  let component: ColumnHeaderComponent;
  let fixture: ComponentFixture<ColumnHeaderComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [ColumnHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
