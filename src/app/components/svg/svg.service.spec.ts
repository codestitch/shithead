import { TestBed } from '@angular/core/testing';

import { SvgService } from './svg.service';
import { HttpClient } from 'selenium-webdriver/http';
import { Renderer2 } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('SvgService', () => {
   beforeEach(() =>
      TestBed.configureTestingModule({
         providers: [
            SvgService,
            {
               provide: Renderer2,
               useValue: {}
            }
         ],
         imports: [HttpClientModule]
      })
   );

   it('should be created', () => {
      const service: SvgService = TestBed.get(SvgService);
      expect(service).toBeTruthy();
   });
});
