import Deck from './Deck';
import Hand from './Hand';
import CardRenderer from './CardRenderer';

export default class House extends CardRenderer {
  hand: Hand;
  messenger: Node;
  deck: Deck;
  constructor(deck: Deck, messageReceiver: Node) {
    super();
    this.hand = new Hand();
    this.deck = deck;
    this.messenger = messageReceiver;
    this.constructHouseUI();
  }
  constructHouseUI() {
    const houseUI = document.createElement('div');
    houseUI.setAttribute('class', 'house-ui');
    document.body.prepend(houseUI);

    const houseCardContainer = document.createElement('div');
    houseCardContainer.setAttribute('class', 'house-cards');
    houseUI.appendChild(houseCardContainer);
  }
  houseIsBusted(): boolean {
    return this.hand.handValue.every(v => v > 21)
  }
  executeStrategy() {
    document.querySelectorAll('button').forEach((e) => e.setAttribute('disabled', 'true'));
    let hasStayed = false;
    let hasBusted = false;
    let hasWon = false;
    // Aces are automatically valued at 11 if the dealer's card count equals 17
    // or higher. Aces are valued at 1 if count is 16 or less.
    // https://www.instructables.com/How-to-Play-21Blackjack/
    while (!this.houseIsBusted() && !hasStayed && !hasBusted && !hasWon) {
      if (this.hand.handValue.some(v => v > 16)) {
        hasStayed = true;
      } else {
        this.hit();
        this.renderCards('.house-cards', this.hand.cards);
        if (this.houseIsBusted()) {
          hasBusted = true;
        } else if (this.hand.handValue.some(v => v === 21)) {
          hasWon = true;
        }
      }
    }
    if (hasStayed) {
      this.stay();
    } else if (hasBusted) {
      this.messenger.dispatchEvent(new Event('house-lost-turn'));
    } else if (hasWon) {
      this.messenger.dispatchEvent(new Event('house-won-turn'));
    }
    document.querySelectorAll('button').forEach((e) => e.removeAttribute('disabled'));
  }
  stay() {
    this.messenger.dispatchEvent(new Event('house-end-turn'));
  }
  hit() {
    this.hand.drawCard(this.deck);
  }
}
