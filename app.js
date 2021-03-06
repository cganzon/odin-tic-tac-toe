const player = (marker) => {
  const getMarker = () => marker;
  return { getMarker };
};

const gameBoard = (() => {
  let gameBoard = [null, null, null, null, null, null, null, null, null];
  const winningCombinations = [
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
    gameBoard[index] = marker;
  };

  const checkWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return gameBoard[index] === currentPlayer.getMarker();
      });
    });
  };

  const isDraw = () => {
    return [...dom.cells].every((cell) => {
      return cell.textContent !== "";
    });
  };

  const resetBoardArray = () => {
    gameBoard = [null, null, null, null, null, null, null, null, null];
  };

  return { saveMarker, checkWin, isDraw, resetBoardArray };
})();

const dom = (() => {
  const cells = document.querySelectorAll(".cell");
  const markerTurn = document.querySelector(".marker-turn");
  const endGameDisplay = document.querySelector(".end-game-display");
  const endGameMessage = document.querySelector(".end-game-message");
  const restartButton = document.querySelector(".restart");

  const addCellListeners = (currentPlayer, playerOne, playerTwo) => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (cell.textContent !== "") return;
        dom.markSpot(cell, currentPlayer.getMarker());
        gameBoard.saveMarker(index, currentPlayer.getMarker());

        if (gameBoard.checkWin(currentPlayer)) {
          game.endGame(currentPlayer);
        } else if (gameBoard.isDraw()) {
          game.endGame(null);
        } else {
          currentPlayer = game.swapTurns(currentPlayer, playerOne, playerTwo);
          dom.markerTurn.textContent = `${currentPlayer.getMarker()}'s turn`;
        }
      });
    });
  };

  const markSpot = (cell, marker) => {
    cell.textContent = marker;
  };

  const showEndGameDisplay = (winner) => {
    endGameDisplay.classList.add("show");
    dom.addRestartButtonListener();
    if (winner === null) {
      endGameMessage.textContent = "It's a draw!";
    } else {
      endGameMessage.textContent = `${winner.getMarker()} wins!`;
    }
  };

  const hideEndGameDisplay = () => {
    endGameDisplay.classList.remove("show");
    endGameMessage.textContent = "";
  };

  const addRestartButtonListener = () => {
    restartButton.addEventListener("click", () => {
      game.restartGame();
    });
  };

  const resetCells = () => {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  };

  return {
    cells,
    markerTurn,
    addCellListeners,
    markSpot,
    showEndGameDisplay,
    hideEndGameDisplay,
    addRestartButtonListener,
    resetCells,
  };
})();

const game = (() => {
  const startGame = () => {
    const playerOne = player("X");
    const playerTwo = player("O");
    let currentPlayer = playerOne;
    dom.markerTurn.textContent = `${currentPlayer.getMarker()}'s turn`;
    dom.addCellListeners(currentPlayer, playerOne, playerTwo);
  };

  const swapTurns = (currentPlayer, playerOne, playerTwo) => {
    return currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const endGame = (winner) => {
    if (winner === null) {
      dom.showEndGameDisplay(null);
    } else {
      dom.showEndGameDisplay(winner);
    }
  };

  const restartGame = () => {
    gameBoard.resetBoardArray();
    dom.resetCells();
    dom.hideEndGameDisplay();
  };

  return { startGame, swapTurns, endGame, restartGame };
})();

game.startGame();
