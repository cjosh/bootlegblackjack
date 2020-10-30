const Card = require('./Card');

class Board {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.turn = 0;
  }
  static generateCards(size) {
    const newCards = [];
    const possibleCardAttrs = [10, 20, 30, 40, 50, 60];
    for (let i = 0; i < size; i += 1) {
      const newCard = new Card(
        'monster',
        'img',
        possibleCardAttrs[Math.floor(Math.random() * possibleCardAttrs.length)],
        possibleCardAttrs[Math.floor(Math.random() * possibleCardAttrs.length)]
      );
      newCards.push(newCard);
    }
    return newCards;
  }
  play() {
    this.player1.drawCard();
    this.player2.drawCard();
    while (this.player1.health > 0 && this.player2.health > 0) {
      if (this.turn === 0) {
        this.player1.attack(this.player2);
        this.turn = 1;
      } else {
        this.player2.attack(this.player2);
        this.turn = 0;
      }
    }
  }
}

module.exports = Board;
// export default Board;