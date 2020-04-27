import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';

export const routes: Routes = [
   {
      path: '',
      component: GameComponent,
      children: [
         {
            path: 'create',
            loadChildren: () => import('./create/create.module').then(x => x.CreateModule)
         },
         {
            path: 'join',
            loadChildren: () => import('./join/join.module').then(x => x.JoinModule)
         },
         {
            path: 'play/:sessionId/:status',
            loadChildren: () => import('./play/play.module').then(x => x.PlayModule)
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class GameRoutingModule {}
