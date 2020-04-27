import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIconComponent } from './svg-icon.component';
import { HttpClientModule } from '@angular/common/http';
import { SvgService } from '../svg.service';
import { SimpleChange } from '@angular/core';

describe('SvgIconComponent', () => {
   let component: SvgIconComponent;
   let fixture: ComponentFixture<SvgIconComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [SvgIconComponent],
         providers: [
            {
               provide: SvgService,
               useValue: {}
            }
         ],
         imports: [HttpClientModule]
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

   describe('service integration', () => {
      let serviceMock: SvgService;

      beforeEach(() => {
         serviceMock = new SvgService(undefined, undefined);
      });

      it('should register the svg element in the service upon init', () => {
         spyOn(serviceMock, 'registerSvgElement');
         const componentMock = new SvgIconComponent(undefined, serviceMock);
         expect(serviceMock.registerSvgElement).toHaveBeenCalled();
      });

      it('should set the correct svg type in the service upon init', () => {
         spyOn(serviceMock, 'setType');
         const componentMock = new SvgIconComponent(undefined, serviceMock);
         expect(serviceMock.setType).toHaveBeenCalledWith('icons');
      });

      it('should trigger service changes when component changes', () => {
         spyOn(serviceMock.changes$, 'next');
         const componentMock = new SvgIconComponent(undefined, serviceMock);
         const change1 = {
            name: new SimpleChange('undefined', 'name1', true)
         };

         componentMock.onChanges$.next(change1);
         expect(serviceMock.changes$.next).toHaveBeenCalledWith(change1);

         const change2 = {
            name: new SimpleChange('name1', 'name2', false)
         };
         componentMock.onChanges$.next(change2);
         expect(serviceMock.changes$.next).toHaveBeenCalledWith(change2);
      });
   });
});
