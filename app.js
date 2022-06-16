const gameBoard = (() => {
  const gameBoard = [];
  return { gameBoard };
})();

const dom = (() => {
  const board = document.querySelector(".board");
  return { board };
})();

const game = (() => {
  const addCellListeners = () => {
    dom.board.addEventListener("click", (e) => markSpot(e.target));
  };
  const markSpot = (cell) => {
    cell.textContent = "X";
  };
  return { addCellListeners };
})();

game.addCellListeners();
