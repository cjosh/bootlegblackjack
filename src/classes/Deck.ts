import Card from './Card';
import { SUITS } from '../enums';
export default class Deck {
  cards: Card[];
  constructor() {
    this.cards = [];
  }
  drawCard(): Card {
    if (this.cards.length) {
      return this.cards.pop();
    } else {
      throw new Error('game over condition - no more cards - refresh');
    }
  }
  resetDeck() {
    this.cards = [];
    for (const suit of <any>Object.values(SUITS)) {
      if (typeof suit === 'number') {
        for (let i = 0; i < 13; i += 1) {
          if (i === 0) {
            this.cards.push(new Card('ace', suit, [1, 11]));
          } else if (i === 1) {
            this.cards.push(new Card('king', suit, [10]));
          } else if (i === 11) {
            this.cards.push(new Card('jack', suit, [10]));
          } else if (i === 12) {
            this.cards.push(new Card('queen', suit, [10]));
          } else {
            this.cards.push(new Card(i.toString(), suit, [i]));
          }
        }
      }
    }
  }
  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i -= 1) {
      const randomIdx = Math.floor(Math.random() * (i + 1));
      const cardToBeSwapped = this.cards[i];
      this.cards[i] = this.cards[randomIdx];
      this.cards[randomIdx] = cardToBeSwapped;
    }
  }
}