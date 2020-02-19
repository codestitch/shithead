import { Card } from 'src/app/services/models';

export interface Player {
   name: string;
   hands: Card[];
   blinds: Card[];
   trumps: Card[];
}