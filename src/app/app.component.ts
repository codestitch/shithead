import { Component } from '@angular/core';
import { Item } from './services/models/item';
import { CardService } from './services/card.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   title = 'shithead';
   items: Array<Item>;
   constructor(private cardService: CardService) {}

   ngOnInit() {
      this.fetchData();
   }
   fetchData() {
      // this.cardService.fetch().subscribe(
      //    (data: Array<Item>) => {
      //       console.log(data);
      //       this.items = data;
      //    },
      //    err => {
      //       console.log(err);
      //    }
      // );
   }
}
