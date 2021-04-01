import { PlayerStatePhase } from './player-state-phase';

export interface RoomPlayerState {
   name: string;
   isTurn: boolean;
   blinds: string;
   hands: string;
   trumps: string;
   phase: PlayerStatePhase
}