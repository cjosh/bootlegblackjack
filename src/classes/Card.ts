import { SUITS } from '../enums';

export default class Card {
  suit: SUITS.CLUB | SUITS.DIAMOND | SUITS.HEART | SUITS.SPADE;
  name: string;
  value: number[];
  constructor(name: string, suit: number, value: number[]) {
    this.name = name;
    this.suit = suit; 
    this.value = value;
  }
}