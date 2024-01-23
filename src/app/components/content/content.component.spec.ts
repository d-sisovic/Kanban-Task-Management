import { ActivatedRoute } from '@angular/router';
import { ContentComponent } from './content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ContentComponent,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { 'data': [] } } }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
