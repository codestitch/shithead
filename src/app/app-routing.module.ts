import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routes: Routes = [
   {
      path: '',
      loadChildren: () => import('./main/main.module').then(m => m.MainModule)
   },
   {
      path: 'game',
      loadChildren: () => import('./game/game.module').then(m => m.GameModule)
   },
   {
      path: 'rules',
      loadChildren: () => import('./rules/rules.module').then(m => m.RulesModule)
   }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [RouterModule]
})
export class AppRoutingModule {}
