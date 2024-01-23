import { SideMenuComponent } from './side-menu.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [SideMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
