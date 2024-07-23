const gameBoard = (function () {
  board = new Array(9);

  return { board };
})();

const player = function (name, marker) {
  return { name, marker };
};

const gameControl = (function () {
  const randomMarks = defineRandomMarks();
  const firstPlayer = player("David", randomMarks[0]);
  const secondPlayer = player("John", randomMarks[1]);

  function defineRandomMarks() {
    const randomNumber = Math.floor(Math.random() * 2);
    return randomNumber === 0 ? ["X", "O"] : ["O", "X"];
  }

  console.log(firstPlayer, secondPlayer);
})();
