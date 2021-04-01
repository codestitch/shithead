import { RoomStatePlayer } from './room-state-player';

export interface RoomState {
   players: Record<string, RoomStatePlayer>;
   game: any;
}