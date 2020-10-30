class Deck {
  constructor(name, cards, health) {
    this.name = name;
    this.cards = cards;
    this.activeCard = null;
    this.deadCards = [];
    this.health = health;
  }
  drawCard() {
    if (this.cards.length) {
      this.activeCard = this.cards[this.cards.length - 1];
      this.cards.splice(this.cards.length - 1, 1);
      console.log(`${this.name} played ${this.activeCard.name} (${this.activeCard.hp}/${this.activeCard.atk})`);
    } else {
      this.handleEmptyDeckCondition();
    }
  }
  destroyCard() {
    if (this.activeCard) {
      this.deadCards.push(this.activeCard);
    }
    this.activeCard = null;
  }
  takeDamage(damage) {
    this.health -= damage;
    console.log(`${this.name} took damage!, ${this.health} is left`);
    if (this.health < 1) {
      this.lose();
    }
  }
  lose() {
    console.log(`${this.name} lost the game`)
  }
  handleEmptyDeckCondition() {
    this.lose();
  }
  attack(opponentDeck) {
    opponentDeck.defendAgainst(this.activeCard);
  }
  defendAgainst(enemyCard) {
    let defense = 0;
    if (this.activeCard) {
      defense += this.activeCard.hp;
    }
    if (enemyCard.atk > defense) {
      this.destroyCard();
      this.takeDamage(enemyCard.atk - defense);
      this.drawCard();
    } else {
      console.log(`YOU defended against attack from ${enemyCard.name} / ${enemyCard.atk}`);
      
    }
  }
}

module.exports = Deck;
// export default Deck;