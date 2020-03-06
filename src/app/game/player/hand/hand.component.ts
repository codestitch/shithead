import {
   Component,
   OnInit,
   Input,
   Output,
   EventEmitter,
   TemplateRef,
   ContentChild,
   ElementRef,
   ChangeDetectorRef
} from '@angular/core';
import { CdkDragStart, DragRef, CdkDragDrop } from '@angular/cdk/drag-drop';
import { sumBy, get, pullAt } from 'lodash-es';

@Component({
   selector: 'xh-hand',
   templateUrl: './hand.component.html',
   styleUrls: ['./hand.component.scss']
})
export class HandComponent {
   @Input() cards: string[];
   @Output() cardsRemoved = new EventEmitter<any[]>();
   @Output() cardsAdded = new EventEmitter<any[]>();
   @Output() cardsUpdated = new EventEmitter<any[]>();
   @Output() selectionChanged = new EventEmitter<any[]>();
   @ContentChild(TemplateRef, { static: false }) templateRef;
   TEMP_IMAGE = 'https://www.flaticon.com/premium-icon/icons/svg/1911/1911305.svg';

   sampleIndex = [1,2];
   dragging: DragRef = null;
   indexSelections: number[] = [];
   private currentSelectionSpan: number[] = [];
   private lastSingleSelection: number;

   constructor(private eRef: ElementRef, private cdRef: ChangeDetectorRef) {}

   select(event, index: number) {
      // select/deselect current
      this.indexSelections = this.isSelected(index)
         ? this.indexSelections.filter(x => x !== index)
         : [...this.indexSelections, index];

      this.selectionChanged.emit(
         this.indexSelections.map(i => this.cards[i])
      );
   }

   isSelected(index: number): boolean {
      return this.indexSelections.includes(index);
   }

   dragStarted(ev: CdkDragStart, index: number): void {
      this.dragging = ev.source._dragRef;
      const indices = this.indexSelections.length ? this.indexSelections : [index];
      ev.source.data = {
         indices,
         values: indices.map(i => this.cards[i]),
         source: this
      };
      if (indices.length === 1) {
         this.selectionChanged.emit([this.cards[index]]);
      }
      this.cdRef.detectChanges();
   }

   dragEnded(): void {
      this.dragging = null;
      this.cdRef.detectChanges();
   }

   dropped(ev: CdkDragDrop<any>): void {
      if (!ev.isPointerOverContainer || !get(ev, 'item.data.source')) {
         return;
      }
      const data = ev.item.data;

      if (data.source === this) {
         const removed = pullAt(this.cards, data.indices);
         if (ev.previousContainer !== ev.container) {
            this.cardsRemoved.emit(removed);
            this.cardsUpdated.emit(this.cards);
         }
      }
      this.dragging = null;
      setTimeout(() => this.clearSelection());
   }

   droppedIntoList(ev: CdkDragDrop<any>): void {
      if (!ev.isPointerOverContainer || !get(ev, 'item.data.source')) {
         return;
      }
      const data = ev.item.data;
      let spliceIntoIndex = ev.currentIndex;
      if (
         ev.previousContainer === ev.container &&
         this.indexSelections.length > 1
      ) {
         this.indexSelections.splice(-1, 1);
         const sum = sumBy(this.indexSelections, selectedIndex =>
            selectedIndex <= spliceIntoIndex ? 1 : 0
         );

         spliceIntoIndex -= sum;
         spliceIntoIndex = spliceIntoIndex < 0 ? 0 : spliceIntoIndex;
      }
      this.cards.splice(spliceIntoIndex, 0, ...data.values);
      this.indexSelections = [];
      
      if (ev.previousContainer !== ev.container) {
         this.cardsAdded.emit(data.values);
      }
      this.cardsUpdated.emit(this.cards.map(c => c));
      setTimeout(() => this.cdRef.detectChanges());
   }

   clearSelection() {
      if (this.indexSelections.length) {
         this.indexSelections = [];
         this.currentSelectionSpan = [];
         this.lastSingleSelection = null;
         this.selectionChanged.emit(
            this.indexSelections.map(i => this.cards[i])
         );
         this.cdRef.detectChanges();
      }
   }
}
