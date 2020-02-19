import { OnDestroy } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';

export class BaseService implements OnDestroy {
   onDestroy$: Observable<void>;

   private _onDestroy$ = new AsyncSubject<void>();

   constructor() {
      this.onDestroy$ = this._onDestroy$.asObservable();
   }

   ngOnDestroy(): void {
      this._onDestroy$.next();
      this._onDestroy$.complete();
   }
}
