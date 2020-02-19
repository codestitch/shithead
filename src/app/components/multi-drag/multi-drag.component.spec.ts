import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDragComponent } from './multi-drag.component';

describe('MultiDragComponent', () => {
  let component: MultiDragComponent;
  let fixture: ComponentFixture<MultiDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
