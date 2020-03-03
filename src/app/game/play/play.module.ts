import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayComponent } from './play.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   {
      path: '',
      component: PlayComponent
   }
];

@NgModule({
   declarations: [PlayComponent],
   imports: [CommonModule, RouterModule.forChild(routes)]
})
export class PlayModule {}
