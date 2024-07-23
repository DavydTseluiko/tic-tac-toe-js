const gameBoard = (function () {
  board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

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
    } while (gameBoard.board[choice - 1] !== "-");

    return (gameBoard.board[choice - 1] = player.mark);
  }
  function displayBoard() {
    let gridBoard = [];
    gameBoard.board.forEach((value, index) => {
      if (index % 3 === 0 && index !== 0) {
        gridBoard.push("\n");
      }
      gridBoard.push(value);
    });
    return gridBoard.join("");
  }
  function checkHorizontal(player) {
    let ifWonHorizontally = 0;
    const boardSpots = [0, 3, 6];

    for (spot of boardSpots) {
      for (let i = spot; i < spot + 3; i++) {
        if (gameBoard.board[i] === player.mark) {
          ifWonHorizontally++;
        }
      }
      if (ifWonHorizontally === 3) {
        console.log(`${player.name} won the game`);
        return "won";
      }
      ifWonHorizontally = 0;
    }
  }
  function defineRules(player) {
    return checkHorizontal(player) === "won";
  }
  function playGame() {
    const orderToPlay = defineOrderToPlay();

    while (roundPlayed <= 9) {
      if (roundPlayed % 2 !== 0) {
        playRound(orderToPlay[0]);
        if (defineRules(orderToPlay[0])) {
          break;
        }
      } else {
        playRound(orderToPlay[1]);
        if (defineRules(orderToPlay[1])) {
          break;
        }
      }
      roundPlayed++;
      console.log(displayBoard());
    }
  }

  console.log(firstPlayer, secondPlayer);

  return { playGame, defineRules };
})();

gameControl.playGame();
