import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracingPageComponent } from './tracing-page.component';

describe('TracingPageComponent', () => {
  let component: TracingPageComponent;
  let fixture: ComponentFixture<TracingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
