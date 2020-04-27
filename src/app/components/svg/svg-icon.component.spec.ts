import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

describe('SvgIconComponent', () => {
   let component: SvgIconComponent;
   let fixture: ComponentFixture<SvgIconComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [SvgIconComponent],
         providers: [
            { provide: HttpClient, useValue: { get: () => new Subject() } }
         ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(SvgIconComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
