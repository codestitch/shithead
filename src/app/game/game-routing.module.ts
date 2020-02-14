import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';

export const routes: Routes = [
   {
      path: '',
      component: GameComponent,
      children: []
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class GameRoutingModule {}
