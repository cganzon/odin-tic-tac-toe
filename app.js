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
  const addCellListeners = () => {
    dom.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        markSpot(cell, "X");
        gameBoard.saveMarker(index, "X");
      });
    });
  };
  const markSpot = (cell, marker) => {
    cell.textContent = marker;
  };
  return { addCellListeners };
})();

game.addCellListeners();
