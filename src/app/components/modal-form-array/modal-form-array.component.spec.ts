import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalFormArrayComponent } from './modal-form-array.component';

describe('ModalFormArrayComponent', () => {
  let component: ModalFormArrayComponent;
  let fixture: ComponentFixture<ModalFormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFormArrayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
