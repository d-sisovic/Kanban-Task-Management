import { ThemeSwitcherComponent } from './theme-switcher.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('ThemeSwitcherComponent', () => {
  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [ThemeSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
