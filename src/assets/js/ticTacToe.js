function getBoardString(gameBoard) {
  let boardString = "";

  for (let i = 0; i < gameBoard.length; i++) {
    boardString += `${gameBoard[i] ?? i + 1}`; //
    if (i % 3 === 2) {
      boardString += "\n";
    }
  }

  return boardString;
}

function getUserInput(e, nextPlayerSymbol, gameBoard) {
  if (e != null) e.preventDefault();

  if (gameBoard && nextPlayerSymbol) {
    return +prompt(
      `Board:\n${getBoardString(
        gameBoard
      )}\n Enter ${nextPlayerSymbol}'s next move (1-9):`
    );
  }
}

function isMoveValid(move, gameBoard) {
  const boardIndex = move - 1;

  return (
    typeof move === "number" &&
    move >= 1 &&
    move <= 9 &&
    gameBoard[boardIndex] === null
  );
}

function makeAMove(gameBoard, nextPlayerSymbol, e) {
  const newGameBoard = [...gameBoard];
  let move;

  do {
    move = getUserInput(e, nextPlayerSymbol, gameBoard);
  } while (!isMoveValid(move, gameBoard));

  const boardIndex = move - 1;
  newGameBoard[boardIndex] = nextPlayerSymbol;

  return newGameBoard;
}

function hasLastMoverWon(lastMove, gameBoard) {
  let winnerCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [i1, i2, i3] of winnerCombos) {
    if (
      gameBoard[i1] === lastMove &&
      gameBoard[i1] === gameBoard[i2] &&
      gameBoard[i1] === gameBoard[i3]
    ) {
      return true;
    }
  }
  return false;
}

function isGameOver(gameBoard, currentPlayerSymbol) {
  if (hasLastMoverWon(currentPlayerSymbol, gameBoard)) {
    alert(`Congratulations, ${currentPlayerSymbol} has won the game`);
    return true;
  }

  if (gameBoard.every((element) => element !== null)) {
    alert("The game is a draw");
    return true;
  }

  return false;
}

export default function ticTacToe(e) {
  let gameBoard = new Array(9).fill(null);
  // let gameBoard = ["X", "X", null, null, null, "O", null, null, "X"];
  let currentPlayerSymbol = null;

  do {
    currentPlayerSymbol = currentPlayerSymbol === "X" ? "O" : "X";
    gameBoard = makeAMove(gameBoard, currentPlayerSymbol, e);
  } while (!isGameOver(gameBoard, currentPlayerSymbol));

  return undefined;
}
