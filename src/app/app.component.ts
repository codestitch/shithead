import { Component, HostListener } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   title = 'Xhead';
   public innerWidth: any;
   constructor() {}
   ngOnInit() {
      this.innerWidth = window.innerWidth;
      console.log(this.innerWidth);
   }

   @HostListener('window:resize', ['$event'])
   onResize(event) {
      this.innerWidth = window.innerWidth;
      console.log(this.innerWidth);
   }
}
