import { Player, PlayerStatePhase } from '../services/models';

export const MockOpponent: Player[] = [
   new Player('0', {
      name: 'Player 0',
      blinds: '2C, 3C, 4C',
      hands: '8D, 7H, 4H, 5H, 9S',
      isTurn: false,
      phase: PlayerStatePhase.HAND,
      trumps: ''
   }),
   new Player('1', {
      name: 'Player 1',      
      blinds: '2C, 3C, 4C',
      hands: '8D, 7H, 4H, 5H, 9S',
      isTurn: false,
      phase: PlayerStatePhase.HAND,
      trumps: ''
   }),
   new Player('2', {
      name: 'Player 2',
      blinds: '2C, 3C, 4C',
      hands: '8D, 7H, 4H, 5H, 9S',
      isTurn: false,
      phase: PlayerStatePhase.HAND,
      trumps: ''
   }),
   new Player('3', {
      name: 'Player 3',
      blinds: '2C, 3C, 4C',
      hands: '8D, 7H, 4H, 5H, 9S',
      isTurn: false,
      phase: PlayerStatePhase.HAND,
      trumps: ''
   }),
   // new Player('4', {
   //    name: 'Player 4'
   // } as any),
   // new Player('5', {
   //    name: 'Player 5'
   // } as any),
   // new Player('6', {
   //    name: 'Player 6'
   // } as any)
];
