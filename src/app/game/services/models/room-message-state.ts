import { StateAction } from './state-action';

export interface RoomMessageState {
   action: StateAction;
   data: any;
}