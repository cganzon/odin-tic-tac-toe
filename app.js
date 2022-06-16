const player = (marker) => {
  const getMarker = () => marker;
  return { getMarker };
};

const playerOne = player("X");
console.log(playerOne);

const gameBoard = (() => {
  const gameBoard = [null, null, null, null, null, null, null, null, null];
  const saveMarker = (index, marker) => {
    gameBoard[index] = marker;
    console.log(gameBoard);
  };
  return { saveMarker };
})();

const dom = (() => {
  const cells = document.querySelectorAll(".cell");
  return { cells };
})();

const game = (() => {
  const startGame = () => {
    const playerOne = player("X");
    const playerTwo = player("O");
    let currentPlayer = playerOne;
    addCellListeners(currentPlayer, playerOne, playerTwo);
  };
  const addCellListeners = (currentPlayer, playerOne, playerTwo) => {
    dom.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        markSpot(cell, currentPlayer.getMarker());
        gameBoard.saveMarker(index, currentPlayer.getMarker());
        if (currentPlayer.getMarker() === "X") {
          currentPlayer = playerTwo;
        } else {
          currentPlayer = playerOne;
        }
      });
    });
  };
  const markSpot = (cell, marker) => {
    cell.textContent = marker;
  };
  return { startGame };
})();

game.startGame();
