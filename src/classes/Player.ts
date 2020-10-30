import Deck from './Deck';
import Hand from './Hand';
import CardRenderer from './CardRenderer';

export default class Player extends CardRenderer {
  hand: Hand;
  deck: Deck;
  dispatchEvent: Function;
  messenger: Node;
  constructor(deck: Deck, messageReceiver: Node) {
    super();
    this.deck = deck;
    this.hand = new Hand();
    this.messenger = messageReceiver;
    this.constructPlayerUI();
  }
  playerIsBusted(): boolean {
    return this.hand.handValue.every(v => v > 21)
  }
  constructPlayerUI() {
    const containingDiv = document.createElement('div');
    containingDiv.setAttribute('class', 'player-ui');
    document.body.appendChild(containingDiv);

    const playerCardContainer = document.createElement('div');
    playerCardContainer.setAttribute('class', 'player-cards');
    document.querySelector('.player-ui').appendChild(playerCardContainer);

    const hitButton = document.createElement('button');
    const hitButtonText = document.createTextNode('hit');
    hitButton.appendChild(hitButtonText);
    document.querySelector('.player-ui').appendChild(hitButton);
    hitButton.addEventListener('click', (e) => {
      this.hit();
      this.renderCards('.player-cards', this.hand.cards);
    });

    const stayButton = document.createElement('button');
    const stayButtonText = document.createTextNode('stay');
    stayButton.appendChild(stayButtonText);
    document.querySelector('.player-ui').appendChild(stayButton);
    stayButton.addEventListener('click', (e) => {
      this.stay();
    });

  }
  hit() {
    this.hand.drawCard(this.deck);
    let event;
    if (this.playerIsBusted()) {
      event = new CustomEvent('player-lost-turn', { detail: this });
    } else if (this.hand.handValue.some(v => v === 21)) {
      event = new CustomEvent('player-won-turn', { detail: this });
    }
    if (event) {
      this.messenger.dispatchEvent(event);
    }
  }
  stay() {
    this.messenger.dispatchEvent(new Event('player-end-turn'));
  }
}
