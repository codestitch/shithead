import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RulesComponent } from './rules.component';

export const routes: Routes = [
   {
      path: '',
      component: RulesComponent,
      children: []
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class RulesRoutingModule {}
