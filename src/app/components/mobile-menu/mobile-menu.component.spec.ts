import { MobileMenuComponent } from './mobile-menu.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('MobileMenuComponent', () => {
  let component: MobileMenuComponent;
  let fixture: ComponentFixture<MobileMenuComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [MobileMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
