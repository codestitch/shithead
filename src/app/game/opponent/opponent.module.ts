import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpponentComponent } from './opponent.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   {
      path: '',
      component: OpponentComponent
   }
];

@NgModule({
   declarations: [OpponentComponent],
   imports: [CommonModule, RouterModule.forChild(routes)],
   exports: [OpponentComponent]
})
export class OpponentModule {}
