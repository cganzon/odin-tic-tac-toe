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
  return { gameBoard, saveMarker };
})();

const dom = (() => {
  const cells = document.querySelectorAll(".cell");
  return { cells };
})();

const game = (() => {
  const startGame = () => {
    const playerOne = player("X");
    addCellListeners(playerOne);
  };
  const addCellListeners = (player) => {
    dom.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        markSpot(cell, player.getMarker());
        gameBoard.saveMarker(index, player.getMarker());
      });
    });
  };
  const markSpot = (cell, marker) => {
    cell.textContent = marker;
  };
  return { addCellListeners, startGame };
})();

game.startGame();
