import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from './rules.component';
import { RulesRoutingModule } from './rules-routing.module';

@NgModule({
   declarations: [RulesComponent],
   imports: [CommonModule, RulesRoutingModule]
})
export class RulesModule {}
