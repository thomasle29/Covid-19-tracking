import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InforPageComponent } from './infor-page.component';

describe('InforPageComponent', () => {
  let component: InforPageComponent;
  let fixture: ComponentFixture<InforPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InforPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InforPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
