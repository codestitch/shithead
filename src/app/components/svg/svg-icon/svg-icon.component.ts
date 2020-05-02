import { Component, Input, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { SvgService } from '../svg.service';
import { IconCategory } from '../models/icon-category';
import { BaseComponent } from 'src/app/services/base-component';

@Component({
   selector: 'xh-svg-icon',
   templateUrl: './svg-icon.component.html',
   styleUrls: ['./svg-icon.component.scss'],
   providers: [SvgService]
})
export class SvgIconComponent extends BaseComponent {
   @Input() set size(val: number) {
      this.svgService.setSize(val);
   }
   @Input() value: string;
   @Input() name: string;
   @Input() category: IconCategory;
   @Input() title: string;
   @Input() set unit(val: '%' | 'rem') {
      this.svgService.setUnit(val);
   }

   constructor(
      private el: ElementRef<HTMLElement>,
      private svgService: SvgService
   ) {
      super();

      this.svgService.registerSvgElement(this.el);

      this.svgService.setType('icons');

      this.onChanges$
         .pipe(map(changes => this.svgService.changes$.next(changes)))
         .subscribe();

      this.onInit$.subscribe(() => {
         this.svgService.setValue(this.value, this.title);
         this.svgService.setDetail(this.name, this.title, this.category);
      });
   }
}
