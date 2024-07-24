const gameBoard = (function () {
  const board = document.querySelectorAll(".block");

  board.forEach((block) =>
    block.addEventListener("click", (event) => gameControl.playGame(event))
  );

  function reset() {
    board.forEach((block) => (block.textContent = ""));
  }

  return { board, reset };
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
  function playRound(event, player) {
    if (event.target.textContent === "") {
      roundPlayed++;
      return (event.target.textContent = player.mark);
    }
  }
  function checkHorizontal(player) {
    let ifWon = 0;
    const boardSpots = [0, 3, 6];

    for (spot of boardSpots) {
      for (let i = spot; i < spot + 3; i++) {
        if (gameBoard.board[i].textContent === player.mark) {
          ifWon++;
        }
      }
      if (ifWon === 3) {
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
        if (gameBoard.board[i].textContent === player.mark) {
          ifWon++;
        }
      }
      if (ifWon === 3) {
        return true;
      }
      ifWon = 0;
    }
  }
  function checkDiagonal(player) {
    let ifWonLeftDiagonal = 0;
    let ifWonRightDiagonal = 0;

    for (let i = 0; i < 9; i += 4) {
      if (gameBoard.board[i].textContent == player.mark) {
        ifWonLeftDiagonal++;
      }
    }
    for (let i = 2; i < 7; i += 2) {
      if (gameBoard.board[i].textContent == player.mark) {
        ifWonRightDiagonal++;
      }
    }
    if (ifWonLeftDiagonal === 3 || ifWonRightDiagonal === 3) {
      return true;
    }
  }
  function defineWinner(player) {
    const winner = document.querySelector(".winner");

    winner.textContent = `${player.name} won the game`;
    winner.classList.add("show");

    setTimeout(() => {
      winner.classList.remove("show");
    }, 2200);
  }
  function defineRules(player) {
    if (
      checkHorizontal(player) ||
      checkVertical(player) ||
      checkDiagonal(player)
    ) {
      defineWinner(player);
      gameBoard.reset();
      roundPlayed = 1;
    }
  }
  function playGame(event) {
    const orderToPlay = defineOrderToPlay();
    if (roundPlayed % 2 !== 0) {
      playRound(event, orderToPlay[0]);
      defineRules(orderToPlay[0]);
    } else {
      playRound(event, orderToPlay[1]);
      defineRules(orderToPlay[1]);
    }
    if (roundPlayed === 10) {
      console.log("It's a tie");
      gameBoard.reset();
      roundPlayed = 1;
    }
  }

  return { playGame };
})();

// gameControl.playGame();
