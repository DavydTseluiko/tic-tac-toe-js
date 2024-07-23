const gameBoard = (function () {
  board = new Array(9);

  return { board };
})();

const player = function (name, mark) {
  return { name, mark };
};

const gameControl = (function () {
  const randomMarks = defineRandomMarks();
  const firstPlayer = player("David", randomMarks[0]);
  const secondPlayer = player("John", randomMarks[1]);

  let roundPlayed = 1;

  function defineRandomMarks() {
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber === 0 ? ["X", "O"] : ["O", "X"];
  }
  function defineOrderToPlay() {
    return firstPlayer.mark === "X"
      ? [firstPlayer, secondPlayer]
      : [secondPlayer, firstPlayer];
  }
  function defineChoice(player) {
    let choice;
    do {
      choice = +prompt(`${player.name} enter number between 1 and 9`);
    } while (choice < 1 || choice > 9);
    return choice;
  }
  function playRound(player) {
    let choice;
    do {
      choice = defineChoice(player);
    } while (gameBoard.board[choice - 1] !== undefined);

    return (gameBoard.board[choice - 1] = player.mark);
  }
  function playGame() {
    const orderToPlay = defineOrderToPlay();

    while (roundPlayed <= 9) {
      if (roundPlayed % 2 !== 0) {
        playRound(orderToPlay[0]);
      } else {
        playRound(orderToPlay[1]);
      }
      roundPlayed++;
      console.log(gameBoard.board);
    }
  }

  console.log(firstPlayer, secondPlayer);

  return { playGame };
})();

gameControl.playGame();
