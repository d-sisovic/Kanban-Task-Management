import { HeaderComponent } from './header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
