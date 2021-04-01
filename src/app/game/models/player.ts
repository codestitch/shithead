import { ToArray } from 'src/app/services/util';
import { PlayerStatePhase } from './player-state-phase';
import { RoomPlayerState } from './room-player-state';

export class Player {
   id: string;
   name: string;
   hands: string[];
   blinds: string[];
   trumps: string[];
   isTurn: boolean;
   phase: PlayerStatePhase;

   constructor(_id: string = '', player: RoomPlayerState) {
      this.id = _id;
      this.name = player?.name;
      this.hands = player?.hands ? ToArray(player.hands) : [];
      this.blinds = player?.blinds ? ToArray(player.blinds) : [];
      this.trumps = player?.trumps ? ToArray(player.trumps) : [];
      this.isTurn = player?.isTurn;
      this.phase = player?.phase;
   }

   setCards(_hands: string, _blinds: string, _trumps: string): Player {
      this.hands = _hands ? ToArray(_hands) : [];
      this.blinds = _blinds ? ToArray(_blinds) : [];
      this.trumps = _trumps ? ToArray(_trumps) : [];

      return Object.assign(new Player(null, null), {
         ...this
      });
   }
}
