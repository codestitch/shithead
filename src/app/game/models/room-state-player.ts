export interface RoomStatePlayer {
   $changed: boolean;
   blinds: string[];
   hands: string[];
   isTurn: boolean;
   name: string;
   phase: string;
   trumps: string;
}