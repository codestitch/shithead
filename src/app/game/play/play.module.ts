import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayComponent } from './play.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
   {
      path: '',
      component: PlayComponent
   }
];

@NgModule({
   declarations: [PlayComponent],
   imports: [CommonModule, RouterModule.forChild(routes), FormsModule]
})
export class PlayModule {}
