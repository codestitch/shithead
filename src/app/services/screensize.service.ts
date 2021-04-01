import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { BaseService } from './base-service';

export interface ElementPosition {
   x: number;
   y: number;
   z: number;
}

export interface ElementSize {
   width: number;
   height: number;
   position?: ElementPosition;
}

@Injectable({
   providedIn: 'root'
})
export class ScreensizeService extends BaseService {
   tableSize$: Observable<ElementSize>;
   private _tableSize$ = new BehaviorSubject<ElementSize>(null);
   get onResize$(): Observable<ElementSize> {
      return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
   }

   private resizeSubject: Subject<ElementSize>;

   constructor() {
      super();

      this.resizeSubject = new Subject();
      this.tableSize$ = this._tableSize$
         .asObservable()
         .pipe(distinctUntilChanged());
   }

   onResize(size: ElementSize) {
      this.resizeSubject.next(size);
      const newSize = {
         width: size.width - 220,
         height: size.height - 142
      }
      this._tableSize$.next(newSize);
      
   }
}
