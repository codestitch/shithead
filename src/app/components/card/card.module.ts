import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { SvgModule } from '../svg/svg.module';

@NgModule({
   declarations: [CardComponent],
   imports: [CommonModule, SvgModule],
   exports: [CardComponent]
})
export class CardModule {}
