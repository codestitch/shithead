import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPileComponent } from './play-pile.component';

describe('PlayPileComponent', () => {
  let component: PlayPileComponent;
  let fixture: ComponentFixture<PlayPileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayPileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayPileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
