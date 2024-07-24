const gameBoard = (function () {
  const board = document.querySelectorAll(".block");

  board.forEach((block) =>
    block.addEventListener("click", (event) => gameControl.playGame(event))
  );

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
    let ifWon = 0;
    const boardSpots = [0, 3, 6];

    for (spot of boardSpots) {
      for (let i = spot; i < spot + 3; i++) {
        if (gameBoard.board[i] === player.mark) {
          ifWon++;
        }
      }
      if (ifWon === 3) {
        console.log(`${player.name} won the game`);
        return true;
      }
      ifWon = 0;
    }
  }
  function checkVertical(player) {
    let ifWon = 0;
    const boardSpots = [0, 1, 2];

    for (spot of boardSpots) {
      for (let i = spot; i <= spot + 6; i += 3) {
        if (gameBoard.board[i] === player.mark) {
          ifWon++;
        }
      }
      if (ifWon === 3) {
        console.log(`${player.name} won the game`);
        return true;
      }
      ifWon = 0;
    }
  }
  function checkDiagonal(player) {
    let ifWonLeftDiagonal = 0;
    let ifWonRightDiagonal = 0;

    for (let i = 0; i < 9; i += 4) {
      if (gameBoard.board[i] == player.mark) {
        ifWonLeftDiagonal++;
      }
    }
    for (let i = 2; i < 7; i += 2) {
      if (gameBoard.board[i] == player.mark) {
        ifWonRightDiagonal++;
      }
    }
    if (ifWonLeftDiagonal === 3 || ifWonRightDiagonal === 3) {
      console.log(`${player.name} won the game`);
      return true;
    }
  }
  function defineRules(player) {
    return (
      checkHorizontal(player) || checkVertical(player) || checkDiagonal(player)
    );
  }
  function playGame(event) {
    // const orderToPlay = defineOrderToPlay();
    // while (roundPlayed <= 9) {
    //   if (roundPlayed % 2 !== 0) {
    //     playRound(orderToPlay[0]);
    //     console.log(displayBoard());
    //     if (defineRules(orderToPlay[0])) {
    //       break;
    //     }
    //   } else {
    //     playRound(orderToPlay[1]);
    //     console.log(displayBoard());
    //     if (defineRules(orderToPlay[1])) {
    //       break;
    //     }
    //   }
    //   roundPlayed++;
    // }
    // if (roundPlayed === 10) {
    //   console.log("It's a tie");
    // }
    roundPlayed++;
    event.target.textContent = event.target.dataset.index;
    console.log(roundPlayed);
  }

  return { playGame };
})();

// gameControl.playGame();
