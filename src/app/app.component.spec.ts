import { AppComponent } from './app.component';
import { TestBed, waitForAsync } from '@angular/core/testing';

describe('AppComponent', () => {
  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
