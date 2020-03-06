export class Player {
   id: string;
   name: string;
   hands: string[];
   blinds: string[];
   trumps: string[];

   constructor(
      _id: string,
      _name: string,
      _hands: string[] = [],
      _blinds: string[] = [],
      _trumps: string[] = []
   ) {
      this.id = _id;
      this.name = _name;
      this.hands = _hands || [];
      this.blinds = _blinds || [];
      this.trumps = _trumps || [];
   }

   setCards(
      _hands: string[] = [],
      _blinds: string[] = [],
      _trumps: string[] = []
   ) {
      this.hands = _hands || [];
      this.blinds = _blinds || [];
      this.trumps = _trumps || [];
   }
}
