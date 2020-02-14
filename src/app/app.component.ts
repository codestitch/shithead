import { Component } from '@angular/core';
import { Item } from './services/models/item';
import { ApiService } from './services/api.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'shithead';
   items: Array<Item>;
   constructor(private apiService: ApiService) {}

   ngOnInit() {
      this.fetchData();
   }
   fetchData() {
      this.apiService.fetch().subscribe(
         (data: Array<Item>) => {
            console.log(data);
            this.items = data;
         },
         err => {
            console.log(err);
         }
      );
   }
}
