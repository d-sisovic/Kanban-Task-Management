import { ModalFormArrayComponent } from './modal-form-array.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, FormGroupDirective, ControlContainer } from '@angular/forms';

describe('ModalFormArrayComponent', () => {
  let component: ModalFormArrayComponent;
  let fixture: ComponentFixture<ModalFormArrayComponent>;

  beforeEach(waitForAsync (() => {
    const fg: FormGroup = new FormGroup({});

    const fgd: FormGroupDirective = new FormGroupDirective([], []);
    fgd.form = fg;

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ModalFormArrayComponent
      ],
      providers: [
        { provide: ControlContainer, useValue: fgd }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
