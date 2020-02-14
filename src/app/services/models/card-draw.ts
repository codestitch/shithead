import { Card } from './card';

export interface CardDraw {
   success: boolean;
   cards: Card[];
   deck_id: string;
   remaining: number;
}