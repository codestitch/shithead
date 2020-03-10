import { ToArray } from 'src/app/services/util';

export class Player {
   id: string;
   name: string;
   hands: string[];
   blinds: string[];
   trumps: string[];

   constructor(
      _id: string,
      _name: string,
      _hands: string = '',
      _blinds: string = '',
      _trumps: string = ''
   ) {
      this.id = _id;
      this.name = _name;
      this.hands = _hands ? ToArray(_hands) : [];
      this.blinds = _blinds ? ToArray(_blinds) : [];
      this.trumps = _trumps ? ToArray(_trumps) : [];
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
