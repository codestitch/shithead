import { Component, HostListener } from '@angular/core';
import { ScreensizeService } from './services/screensize.service';

@Component({
   selector: 'app-root',
   template: `
      <router-outlet></router-outlet>
   `,
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   title = 'Xhead';
   constructor(private screenService: ScreensizeService) {}
   ngOnInit() {}

   ngAfterViewInit() {
      this.detectScreenSize();
   }

   @HostListener('window:resize', ['$event'])
   onResize(event) {
      this.detectScreenSize();
   }

   private detectScreenSize() {
      this.screenService.onResize({
         width: window.innerWidth,
         height: window.innerHeight
      });
   }
}
