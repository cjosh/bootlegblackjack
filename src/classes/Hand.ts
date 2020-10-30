import Card from './Card';
import Deck from './Deck';

export default class Hand {
  cards: Card[];
  constructor() {
    this.cards = [];
  }
  drawCard(deck: Deck) {
    this.cards.push(deck.drawCard())
  }
  discardHand() {
    this.cards = [];
  }
  get handValue(): number[] {
    return this.cards.reduce((acc, cur) => {
      const firstValue = acc[0] + cur.value[0];
      const secondValue = acc[1] + (cur.value[1] ? cur.value[1] : cur.value[0]);
      return [firstValue, secondValue];
    }, [0, 0]);
  }
}