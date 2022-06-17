const player = (marker) => {
  const getMarker = () => marker;
  return { getMarker };
};

const gameBoard = (() => {
  const _gameBoard = [null, null, null, null, null, null, null, null, null];
  const saveMarker = (index, marker) => {
    _gameBoard[index] = marker;
    console.log(_gameBoard);
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
    _addCellListeners(currentPlayer, playerOne, playerTwo);
  };
  const _addCellListeners = (currentPlayer, playerOne, playerTwo) => {
    dom.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (cell.textContent !== "") {
          return;
        } else {
          _markSpot(cell, currentPlayer.getMarker());
          gameBoard.saveMarker(index, currentPlayer.getMarker());
          currentPlayer = swapTurns(currentPlayer, playerOne, playerTwo);
        }
      });
    });
  };
  const _markSpot = (cell, marker) => {
    cell.textContent = marker;
  };
  const swapTurns = (currentPlayer, playerOne, playerTwo) => {
    return (currentPlayer =
      currentPlayer.getMarker() === "X" ? playerTwo : playerOne);
  };
  return { startGame };
})();

game.startGame();
