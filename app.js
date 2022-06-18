const player = (marker) => {
  const getMarker = () => marker;
  return { getMarker };
};

const gameBoard = (() => {
  const _gameBoard = [null, null, null, null, null, null, null, null, null];
  const _winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const saveMarker = (index, marker) => {
    _gameBoard[index] = marker;
    console.log(_gameBoard);
  };
  const checkWin = (currentPlayer) => {
    return _winningCombinations.some((combination) => {
      return combination.every((index) => {
        return _gameBoard[index] === currentPlayer.getMarker();
      });
    });
  };
  return { saveMarker, checkWin };
})();

const dom = (() => {
  const cells = document.querySelectorAll(".cell");
  const addCellListeners = (currentPlayer, playerOne, playerTwo) => {
    dom.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (cell.textContent !== "") return;
        markSpot(cell, currentPlayer.getMarker());
        gameBoard.saveMarker(index, currentPlayer.getMarker());
        if (gameBoard.checkWin(currentPlayer)) {
          console.log(`${currentPlayer.getMarker()} wins!`);
        }
        currentPlayer = game.swapTurns(currentPlayer, playerOne, playerTwo);
      });
    });
  };
  const markSpot = (cell, marker) => {
    cell.textContent = marker;
  };
  return { cells, addCellListeners };
})();

const game = (() => {
  const startGame = () => {
    const playerOne = player("X");
    const playerTwo = player("O");
    let currentPlayer = playerOne;
    dom.addCellListeners(currentPlayer, playerOne, playerTwo);
  };
  const swapTurns = (currentPlayer, playerOne, playerTwo) => {
    return currentPlayer === playerOne ? playerTwo : playerOne;
  };
  return { startGame, swapTurns };
})();

game.startGame();
