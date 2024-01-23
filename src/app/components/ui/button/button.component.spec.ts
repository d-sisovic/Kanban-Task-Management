import { ButtonComponent } from './button.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
