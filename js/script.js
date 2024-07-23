const gameBoard = (function () {
  board = new Array(9);

  return { board };
})();

const player = function (name, marker) {
  return { name, marker };
};

const gameControl = (function () {
  const firstPlayer = player(prompt("First Player's name"), "X");
  const secondPlayer = player(prompt("Second Player's name"), "O");

  console.log(firstPlayer);
  console.log(secondPlayer);
})();
