import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base-service';
import { Observable } from 'rxjs';
import { RoomService } from './room.service';

@Injectable()
export class GameService extends BaseService {
   gameRoom$: Observable<any>;
   constructor(private roomService: RoomService) {
      super();

      this.gameRoom$ = this.roomService.room$;
   }
}
