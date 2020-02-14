import {
   OnDestroy,
   AfterViewChecked,
   AfterContentChecked,
   AfterContentInit,
   OnInit,
   OnChanges,
   AfterViewInit,
   SimpleChanges
} from '@angular/core';
import { Subject, BehaviorSubject, AsyncSubject } from 'rxjs';

export class BaseComponent
   implements
      OnInit,
      OnChanges,
      OnDestroy,
      AfterViewChecked,
      AfterContentChecked,
      AfterContentInit,
      AfterViewInit {
   onInit$ = new AsyncSubject<void>();
   onChanges$ = new BehaviorSubject<SimpleChanges>({});
   onDestroy$ = new AsyncSubject<void>();
   onAfterViewInit$ = new AsyncSubject<void>();
   onAfterContentInit$ = new AsyncSubject<void>();
   onAfterViewChecked$ = new Subject<void>();
   onAfterContentChecked$ = new Subject<void>();

   constructor() {}

   ngOnInit(): void {
      this.onInit$.next();
      this.onInit$.complete();
   }
   ngOnChanges(changes: SimpleChanges): void {
      this.onChanges$.next(changes);
   }
   ngOnDestroy(): void {
      this.onChanges$.complete();
      this.onAfterContentChecked$.complete();
      this.onAfterViewChecked$.complete();

      this.onDestroy$.next();
      this.onDestroy$.complete();
   }
   ngAfterViewChecked(): void {
      if (this.onAfterViewChecked$.observers.length) {
         this.onAfterViewChecked$.next();
      }
   }
   ngAfterContentChecked(): void {
      if (this.onAfterContentChecked$.observers.length) {
         this.onAfterContentChecked$.next();
      }
   }

   ngAfterViewInit(): void {
      this.onAfterViewInit$.next();
      this.onAfterViewInit$.complete();
   }
   ngAfterContentInit(): void {
      this.onAfterContentInit$.next();
      this.onAfterContentInit$.complete();
   }
}
