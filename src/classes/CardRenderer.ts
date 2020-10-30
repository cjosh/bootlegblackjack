import Card from './Card';
import { SUITS } from '../enums';

export default class CardRender {
  constructor() {

  }
  renderCards(className: string, cards: Card[]) {
    document.querySelector(className).innerHTML = '';
    cards.forEach((card) => {
      const cardDiv = document.createElement('card');
      const cardDivText = document.createTextNode(`${card.name !== '10' ? card.name.charAt(0) : card.name}
        ${this.getSuit(card.suit)}`);
      cardDiv.setAttribute('class', `card card-type-${card.suit}`);
      cardDiv.appendChild(cardDivText);
      document.querySelector(className).appendChild(cardDiv);
    });
  }
  getSuit(suit: number): string {
    switch (suit) {
      case SUITS.CLUB: {
        return '\u2663';
      }
      case SUITS.DIAMOND: {
        return '\u2666';
      }
      case SUITS.HEART: {
        return '\u2665';
      }
      case SUITS.SPADE: {
        return '\u2660';
      }
      default: {
        throw new Error('no suit entered');
      }
    }
  }
}