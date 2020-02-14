import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
   {
      path: 'game',
      loadChildren: () => import('./game/game.module').then(m => m.GameModule)
   },
   {
      path: 'rules',
      loadChildren: () =>
         import('./rules/rules.module').then(m => m.RulesModule)
   },
   {
      path: '**',
      redirectTo: '/'
   }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes, {
         paramsInheritanceStrategy: 'always',
         preloadingStrategy: PreloadAllModules,
         relativeLinkResolution: 'corrected'
      })
   ],
   exports: [RouterModule]
})
export class AppRoutingModule {}
