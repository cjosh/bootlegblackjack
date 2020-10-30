import Deck from './Deck';
import Player from './Player';
import House from './House';
import Hand from './Hand';

export default class GameManager {
  deck: Deck;
  player: Player;
  house: House;
  messageReceiver: Node;
  constructor() {
    this.deck = new Deck();
    
    this.messageReceiver = document.createTextNode(null);
    this.messageReceiver.addEventListener('player-end-turn', () => {
      this.house.executeStrategy();
    });
    this.messageReceiver.addEventListener('player-lost-turn', () => {
      this.executePlayerLoseCondition();
    });
    this.messageReceiver.addEventListener('player-won-turn', () => {
      this.executePlayerWinCondition();
    });
    this.messageReceiver.addEventListener('house-end-turn', () => {
      this.checkWhoWon();
    });
    this.messageReceiver.addEventListener('house-lost-turn', () => {
      this.executePlayerWinCondition();
    });
    this.messageReceiver.addEventListener('house-won-turn', () => {
      this.executePlayerLoseCondition();
    });

    this.player = new Player(this.deck, this.messageReceiver);
    const statsBox = document.createElement('div');
    statsBox.setAttribute('class', 'stats-box');
    statsBox.addEventListener('click', () => {
      statsBox.innerHTML = '';
      this.startRound();
      document.querySelectorAll('button').forEach((e) => e.removeAttribute('disabled'));
    });
    document.body.prepend(statsBox);
    this.house = new House(this.deck, this.messageReceiver);
  }
  startGame() {
    this.deck.resetDeck();
    this.deck.shuffleCards();
    this.startRound();
  }
  startRound() {
    console.log('round start');
    this.player.hand.discardHand();
    this.house.hand.discardHand();
    this.house.renderCards('.house-cards', this.house.hand.cards);
    this.player.renderCards('.player-cards', this.player.hand.cards);
    setTimeout(() => {
      this.player.hand.drawCard(this.deck);
      this.house.hand.drawCard(this.deck);
      this.player.hand.drawCard(this.deck);
      this.house.hand.drawCard(this.deck);
      this.house.renderCards('.house-cards', this.house.hand.cards);
      this.player.renderCards('.player-cards', this.player.hand.cards);
      if (this.house.hand.handValue.some(v => v === 21)) {
        this.executePlayerLoseCondition();
      }
      if (this.player.hand.handValue.some(v => v === 21)) {
        this.executePlayerWinCondition();
      }
    }, 1000)
  }
  checkWhoWon() {
    if (this.house.hand.handValue.some(hV => this.player.hand.handValue.every(pV => hV > pV))
      && !this.house.houseIsBusted()) {
      this.executePlayerLoseCondition();
    } else if (this.house.hand.handValue.some(hV => this.player.hand.handValue.every(pV => hV === pV))) {
      this.executePlayerDrawCondition();
    } else {
      this.executePlayerWinCondition();
    }
  }
  executePlayerWinCondition() {
    this.executeDisplayChange('YOU WIN');
  }
  executePlayerLoseCondition() {
    this.executeDisplayChange('YOU LOST');
  }
  executePlayerDrawCondition() {
    this.executeDisplayChange('DRAW');
  }
  executeDisplayChange(text: string) {
    setTimeout(() => {
      document.querySelectorAll('button').forEach((e) => e.setAttribute('disabled', 'true'));
    });
    const resultDiv = document.querySelector('.stats-box');
    resultDiv.innerHTML = '';
    const title = document.createElement('h1');
    const titleText = document.createTextNode(text);
    title.appendChild(titleText);
    const subTitle = document.createElement('p');
    const subTitleText = document.createTextNode('click here to play again (check console for results)');
    subTitle.appendChild(subTitleText);
    resultDiv.appendChild(title);
    resultDiv.appendChild(subTitle);
    console.log('Round results:');
    console.log('house:', this.house.hand);
    console.log('player:', this.player.hand);
  }
}