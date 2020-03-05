import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinComponent } from './join.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   {
      path: '',
      component: JoinComponent
   }
];

@NgModule({
   declarations: [JoinComponent],
   imports: [CommonModule, RouterModule.forChild(routes)]
})
export class JoinModule {}
