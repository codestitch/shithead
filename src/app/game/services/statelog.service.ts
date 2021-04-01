import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/services/base-service';

@Injectable()
export class StatelogService extends BaseService {
   message$: Observable<string>;
   private _message$ = new BehaviorSubject<string>('');

   constructor() {
      super();

      this.message$ = this._message$.asObservable();

      this.onDestroy$.subscribe(() => this._message$.complete());
   }

   set(message: string) {
      this._message$.next(message);
   }
}
