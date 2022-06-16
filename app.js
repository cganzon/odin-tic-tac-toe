const gameBoard = (() => {
  const gameBoard = [];
  return { gameBoard };
})();

const dom = (() => {
  const cells = document.querySelectorAll(".cell");
  return { cells };
})();

const game = (() => {
  const addCellListeners = () => {
    dom.cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        markSpot(cell, "X");
      });
    });
  };
  const markSpot = (cell, marker) => {
    cell.textContent = marker;
  };
  return { addCellListeners };
})();

game.addCellListeners();
