import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base-service';
const STARTING_CARDS = 9;
const TEMP_IMAGE = 'https://image.flaticon.com/icons/svg/1141/1141093.svg';

@Injectable()
export class GameService extends BaseService {
   constructor() {
      super();
   }
}
